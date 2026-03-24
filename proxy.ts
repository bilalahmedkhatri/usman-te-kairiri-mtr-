import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@prisma/client';
import { canAccessRoute, getDashboardRoute } from './lib/permissions';

export async function proxy(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    // Allow access to auth pages for unauthenticated users
    if (!token) {
        // Redirect to login if trying to access protected routes
        if (pathname.startsWith('/dashboard')) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    // User is authenticated
    const userRole = token.role as UserRole;

    // Redirect from /dashboard to role-specific dashboard
    if (pathname === '/dashboard') {
        const roleDashboard = getDashboardRoute(userRole);
        return NextResponse.redirect(new URL(roleDashboard, request.url));
    }

    // Check if user has permission to access the route
    if (!canAccessRoute(userRole, pathname)) {
        // Redirect to unauthorized page or their dashboard
        const dashboardUrl = getDashboardRoute(userRole);
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    // Redirect authenticated users away from auth pages
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        const dashboardUrl = getDashboardRoute(userRole);
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    return NextResponse.next();
}

// Specify which routes should use this middleware
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register',
        '/cart/:path*',
        '/wishlist/:path*',
    ],
};
