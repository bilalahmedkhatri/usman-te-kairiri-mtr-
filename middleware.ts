import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if user has session cookie
    const authjsToken = request.cookies.get('authjs.session-token');
    const secureAuthjsToken = request.cookies.get('__Secure-authjs.session-token');
    const nextAuthToken = request.cookies.get('next-auth.session-token');
    const secureNextAuthToken = request.cookies.get('__Secure-next-auth.session-token');

    // console.log('🍪 Cookie Check:', {
    //     authjsToken: !!authjsToken,
    //     secureAuthjsToken: !!secureAuthjsToken,
    //     nextAuthToken: !!nextAuthToken,
    //     secureNextAuthToken: !!secureNextAuthToken
    // });

    const sessionToken = authjsToken || secureAuthjsToken || nextAuthToken || secureNextAuthToken;

    const isAuth = !!sessionToken
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile')

    console.log('🛡️ Middleware:', {
        pathname,
        isAuth,
        isProtectedRoute,
        hasToken: !!sessionToken,
        tokenName: sessionToken?.name
    })

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Redirect unauthenticated users to login
    if (isProtectedRoute && !isAuth) {
        const from = pathname + (request.nextUrl.search || '')
        return NextResponse.redirect(
            new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/login',
        '/register',
    ],
}
