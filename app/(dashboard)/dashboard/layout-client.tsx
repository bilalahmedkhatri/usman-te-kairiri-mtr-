'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Bell, Settings, User, Home, BarChart3, Users, Car, Anchor,
    ChevronLeft, Moon, Sun, LogOut, Menu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    session: Session;
}

export default function DashboardLayoutClient({
    children,
    session
}: DashboardLayoutClientProps) {
    console.log('🎨 Dashboard Layout Client: Rendering...', { user: session?.user?.email });
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const userRole = session?.user?.role || 'BUYER';

    // Define navigation with roles
    const allNavigation = [
        { icon: Home, label: 'Dashboard', href: '/dashboard', roles: ['BUYER', 'DEALER', 'ADMIN', 'SUPER_ADMIN'] },
        { icon: Users, label: 'Users', href: '/dashboard/users', roles: ['ADMIN', 'SUPER_ADMIN'] },
        { icon: Car, label: 'Vehicles', href: '/dashboard/vehicles', roles: ['DEALER', 'ADMIN', 'SUPER_ADMIN'] },
        { icon: Anchor, label: 'Ports', href: '/dashboard/ports', roles: ['ADMIN', 'SUPER_ADMIN'] },
        { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics', roles: ['ADMIN', 'SUPER_ADMIN'] },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings', roles: ['BUYER', 'DEALER', 'ADMIN', 'SUPER_ADMIN'] },
    ];

    const navigation = allNavigation.filter(item => item.roles.includes(userRole));

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div className="flex">
                {/* Desktop Sidebar */}
                <motion.aside
                    initial={{ x: -250 }}
                    animate={{ x: 0 }}
                    className={`hidden lg:block ${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen transition-all duration-300`}
                >
                    <SidebarContent
                        navigation={navigation}
                        sidebarOpen={sidebarOpen}
                        theme={theme}
                        pathname={pathname}
                        onLogout={handleLogout}
                    />
                </motion.aside>

                {/* Mobile Sidebar */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween' }}
                            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 lg:hidden"
                        >
                            <SidebarContent
                                navigation={navigation}
                                sidebarOpen={true}
                                theme={theme}
                                pathname={pathname}
                                onLogout={handleLogout}
                            />
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <div className="flex-1 flex flex-col w-full">
                    {/* Top Navbar */}
                    <motion.header
                        initial={{ y: -70 }}
                        animate={{ y: 0 }}
                        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-3 sticky top-0 z-30"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1 max-w-2xl">
                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-3"
                                >
                                    <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>

                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search vehicles, users, ports..."
                                        className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                                </motion.button>

                                {/* User Profile - Hidden on very small screens */}
                                <div className="hidden sm:flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                                        {session.user.image ? (
                                            <img src={session.user.image} alt={session.user.name || 'User'} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="font-semibold text-gray-800 dark:text-white text-sm">{session.user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{session.user.email}</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={toggleTheme}
                                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {theme === 'dark' ?
                                        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" /> :
                                        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                    }
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                >
                                    <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-auto p-4 sm:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

// Separate component for sidebar content
function SidebarContent({
    navigation,
    sidebarOpen,
    theme,
    pathname,
    onLogout
}: {
    navigation: any[];
    sidebarOpen: boolean;
    theme: string;
    pathname: string;
    onLogout: () => void;
}) {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 p-4">
                {sidebarOpen && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white"
                    >
                        Vehicle Export System
                    </motion.h1>
                )}
            </div>

            <nav className="flex-1 space-y-1 px-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link href={item.href} key={item.href}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center ${sidebarOpen ? 'justify-start px-4' : 'justify-center'} py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                {sidebarOpen && <span className="ml-3 font-medium truncate">{item.label}</span>}
                            </motion.button>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 space-y-2">
                <motion.button
                    onClick={onLogout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center ${sidebarOpen ? 'justify-start px-4' : 'justify-center'} py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300`}
                >
                    <LogOut className="w-5 h-5" />
                    {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                </motion.button>
            </div>
        </div>
    );
}
