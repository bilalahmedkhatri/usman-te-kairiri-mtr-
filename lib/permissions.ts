// Permission system for role-based access control
import { UserRole } from '@prisma/client';

// Define all permissions in the system
export const PERMISSIONS = {
    // Dashboard permissions
    'dashboard.view': ['ADMIN', 'MANAGER', 'DEALER', 'SUPPLIER', 'BUYER'],
    'dashboard.admin': ['ADMIN'],
    'dashboard.manager': ['ADMIN', 'MANAGER'],
    'dashboard.dealer': ['ADMIN', 'DEALER'],
    'dashboard.supplier': ['ADMIN', 'SUPPLIER'],
    'dashboard.buyer': ['ADMIN', 'BUYER'],

    // User permissions
    'users.view_all': ['ADMIN', 'MANAGER'],
    'users.create': ['ADMIN'],
    'users.edit': ['ADMIN'],
    'users.delete': ['ADMIN'],
    'users.view_own': ['ADMIN', 'MANAGER', 'DEALER', 'SUPPLIER', 'BUYER'],
    'users.edit_own': ['ADMIN', 'MANAGER', 'DEALER', 'SUPPLIER', 'BUYER'],

    // Vehicle permissions
    'vehicles.view_all': ['ADMIN', 'MANAGER', 'DEALER', 'SUPPLIER', 'BUYER'],
    'vehicles.create': ['ADMIN', 'DEALER'],
    'vehicles.edit_all': ['ADMIN'],
    'vehicles.edit_own': ['ADMIN', 'DEALER'],
    'vehicles.delete_all': ['ADMIN'],
    'vehicles.delete_own': ['ADMIN', 'DEALER'],

    // Dealer profile permissions
    'dealers.view_all': ['ADMIN', 'MANAGER', 'DEALER', 'SUPPLIER', 'BUYER'],
    'dealers.view_profiles': ['ADMIN', 'MANAGER', 'DEALER', 'SUPPLIER', 'BUYER'],
    'dealers.edit_own_profile': ['ADMIN', 'DEALER'],
    'dealers.edit_all': ['ADMIN'],

    // Cart permissions
    'cart.view_all': ['ADMIN', 'MANAGER'],
    'cart.view_own': ['BUYER'],
    'cart.create': ['BUYER'],
    'cart.edit': ['BUYER'],
    'cart.delete': ['BUYER'],

    // Wishlist permissions
    'wishlist.view_all': ['ADMIN', 'MANAGER'],
    'wishlist.view_own': ['BUYER'],
    'wishlist.create': ['BUYER'],
    'wishlist.delete': ['BUYER'],

    // Booking permissions
    'bookings.view_all': ['ADMIN', 'MANAGER'],
    'bookings.view_own': ['BUYER'],
    'bookings.create': ['BUYER'],
    'bookings.approve': ['ADMIN', 'MANAGER'],
    'bookings.cancel': ['ADMIN', 'MANAGER', 'BUYER'],

    // Inquiry permissions
    'inquiries.view_all': ['ADMIN', 'MANAGER'],
    'inquiries.view_own': ['DEALER', 'SUPPLIER', 'BUYER'],
    'inquiries.create': ['BUYER', 'DEALER', 'SUPPLIER'],
    'inquiries.manage': ['ADMIN', 'MANAGER'],
    'inquiries.respond': ['ADMIN', 'MANAGER'],

    // Invoice permissions
    'invoices.view_all': ['ADMIN', 'MANAGER'],
    'invoices.view_own': ['DEALER', 'SUPPLIER', 'BUYER'],
    'invoices.create': ['ADMIN', 'MANAGER', 'DEALER'],
    'invoices.edit': ['ADMIN', 'MANAGER'],
    'invoices.delete': ['ADMIN'],

    // Port permissions
    'ports.view': ['ADMIN', 'MANAGER', 'DEALER', 'SUPPLIER', 'BUYER'],
    'ports.create': ['ADMIN'],
    'ports.edit': ['ADMIN'],
    'ports.delete': ['ADMIN'],

    // Site permissions
    'sites.view_all': ['ADMIN', 'MANAGER'],
    'sites.view_own': ['DEALER', 'SUPPLIER'],
    'sites.create': ['ADMIN'],
    'sites.edit': ['ADMIN'],
    'sites.delete': ['ADMIN'],

    // Report permissions
    'reports.view_all': ['ADMIN', 'MANAGER'],
    'reports.view_own': ['DEALER', 'SUPPLIER', 'BUYER'],

    // Settings permissions
    'settings.system': ['ADMIN'],
    'settings.profile': ['ADMIN', 'MANAGER', 'DEALER', 'SUPPLIER', 'BUYER'],
} as const;

export type Permission = keyof typeof PERMISSIONS;

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(
    userRole: UserRole,
    permission: Permission
): boolean {
    const allowedRoles = PERMISSIONS[permission];
    return (allowedRoles as readonly string[]).includes(userRole);
}

/**
 * Check if a user role has ANY of the specified permissions
 */
export function hasAnyPermission(
    userRole: UserRole,
    permissions: Permission[]
): boolean {
    return permissions.some((permission) => hasPermission(userRole, permission));
}

/**
 * Check if a user role has ALL of the specified permissions
 */
export function hasAllPermissions(
    userRole: UserRole,
    permissions: Permission[]
): boolean {
    return permissions.every((permission) => hasPermission(userRole, permission));
}

/**
 * Get the dashboard route for a specific role
 */
export function getDashboardRoute(role: UserRole): string {
    const dashboardRoutes: Record<UserRole, string> = {
        ADMIN: '/dashboard/admin',
        MANAGER: '/dashboard/manager',
        DEALER: '/dashboard/dealer',
        SUPPLIER: '/dashboard/supplier',
        BUYER: '/dashboard/buyer',
        USER: '/dashboard/buyer', // Default to buyer
        VIEWER: '/dashboard', // Default dashboard
    };

    return dashboardRoutes[role] || '/dashboard';
}

/**
 * Check if a user can access a specific route
 */
export function canAccessRoute(role: UserRole, pathname: string): boolean {
    // Public routes
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        return true;
    }

    // Admin-only routes
    if (pathname.startsWith('/dashboard/admin')) {
        return role === 'ADMIN';
    }

    // Manager routes
    if (pathname.startsWith('/dashboard/manager')) {
        return ['ADMIN', 'MANAGER'].includes(role);
    }

    // Dealer routes
    if (pathname.startsWith('/dashboard/dealer')) {
        return ['ADMIN', 'DEALER'].includes(role);
    }

    // Supplier routes
    if (pathname.startsWith('/dashboard/supplier')) {
        return ['ADMIN', 'SUPPLIER'].includes(role);
    }

    // Buyer routes
    if (
        pathname.startsWith('/dashboard/buyer') ||
        pathname.startsWith('/cart') ||
        pathname.startsWith('/wishlist')
    ) {
        return ['ADMIN', 'BUYER'].includes(role);
    }

    // Default dashboard access
    if (pathname === '/dashboard') {
        return true; // Will redirect to role-specific dashboard
    }

    return true; // Allow by default, specific checks in components
}

/**
 * Filter menu items based on user role
 */
export function getMenuItemsForRole(role: UserRole) {
    const baseItems = [
        { label: 'Dashboard', href: '/dashboard', icon: 'Home' },
    ];

    const roleSpecificItems: Record<UserRole, typeof baseItems> = {
        ADMIN: [
            ...baseItems,
            { label: 'Users', href: '/dashboard/users', icon: 'Users' },
            { label: 'Vehicles', href: '/dashboard/vehicles', icon: 'Car' },
            { label: 'Dealers', href: '/dashboard/dealers', icon: 'Store' },
            { label: 'Bookings', href: '/dashboard/bookings', icon: 'Calendar' },
            { label: 'Inquiries', href: '/dashboard/inquiries', icon: 'MessageSquare' },
            { label: 'Reports', href: '/dashboard/reports', icon: 'BarChart' },
            { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
        ],
        MANAGER: [
            ...baseItems,
            { label: 'Inquiries', href: '/dashboard/inquiries', icon: 'MessageSquare' },
            { label: 'Bookings', href: '/dashboard/bookings', icon: 'Calendar' },
            { label: 'Users', href: '/dashboard/users', icon: 'Users' },
            { label: 'Vehicles', href: '/dashboard/vehicles', icon: 'Car' },
            { label: 'Dealers', href: '/dashboard/dealers', icon: 'Store' },
            { label: 'Reports', href: '/dashboard/reports', icon: 'BarChart' },
        ],
        DEALER: [
            ...baseItems,
            { label: 'My Vehicles', href: '/dashboard/dealer/vehicles', icon: 'Car' },
            { label: 'Add Vehicle', href: '/dashboard/dealer/vehicles/new', icon: 'Plus' },
            { label: 'Sales', href: '/dashboard/dealer/sales', icon: 'DollarSign' },
            { label: 'Messages', href: '/dashboard/dealer/messages', icon: 'MessageSquare' },
            { label: 'My Profile', href: '/dashboard/dealer/profile', icon: 'User' },
        ],
        SUPPLIER: [
            ...baseItems,
            { label: 'My Supplies', href: '/dashboard/supplier/supplies', icon: 'Package' },
            { label: 'Orders', href: '/dashboard/supplier/orders', icon: 'ShoppingCart' },
            { label: 'Inventory', href: '/dashboard/supplier/inventory', icon: 'Warehouse' },
            { label: 'Invoices', href: '/dashboard/supplier/invoices', icon: 'FileText' },
        ],
        BUYER: [
            ...baseItems,
            { label: 'Browse Vehicles', href: '/dashboard/vehicles', icon: 'Search' },
            { label: 'My Cart', href: '/dashboard/buyer/cart', icon: 'ShoppingCart' },
            { label: 'Wishlist', href: '/dashboard/buyer/wishlist', icon: 'Heart' },
            { label: 'My Bookings', href: '/dashboard/buyer/bookings', icon: 'Calendar' },
            { label: 'My Purchases', href: '/dashboard/buyer/purchases', icon: 'Package' },
            { label: 'Dealers', href: '/dashboard/dealers', icon: 'Store' },
        ],
        USER: [
            ...baseItems,
        ],
        VIEWER: [
            ...baseItems,
        ],
    };

    return roleSpecificItems[role] || baseItems;
}
