'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';
import { hasPermission, Permission } from '@/lib/permissions';

interface PermissionGateProps {
    permission: Permission;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * Component that shows/hides content based on user permissions
 */
export function PermissionGate({
    permission,
    children,
    fallback = null,
}: PermissionGateProps) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return null;
    }

    if (!session?.user?.role) {
        return <>{fallback}</>;
    }

    const userRole = session.user.role as UserRole;

    if (!hasPermission(userRole, permission)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}

interface RoleGateProps {
    allowedRoles: UserRole[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * Component that shows/hides content based on user role
 */
export function RoleGate({
    allowedRoles,
    children,
    fallback = null,
}: RoleGateProps) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return null;
    }

    if (!session?.user?.role) {
        return <>{fallback}</>;
    }

    const userRole = session.user.role as UserRole;

    if (!allowedRoles.includes(userRole)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
