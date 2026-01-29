'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    session: Session;
}

export default function DashboardLayoutClient({
    children,
    session
}: DashboardLayoutClientProps) {
    // We can use a client-side mounting check to avoid hydration mismatch on initial render
    // regarding the sidebar/menu state, although strictly not necessary if defaults are good.
    const [mounted, setMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by returning null or a skeleton until mounted
    // if using next-themes or specific client-only state that affects structure.
    // However, for layout structure, we usually want it to render.
    // The theme is handled by ThemeProvider, so we don't need manual logic here.

    if (!mounted) {
        // Optional: return null or a loading state if you want to be super strict,
        // but often redundant with modern Next.js + next-themes
        // return null; 
    }

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    const userRole = session?.user?.role;
    const userProfile = session?.user || {};

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
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
                    initial={false}
                    animate={{ width: sidebarOpen ? 256 : 80 }}
                    className={`hidden lg:block bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen transition-all duration-300`}
                >
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        onLogout={handleLogout}
                        userRole={userRole}
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
                            <Sidebar
                                sidebarOpen={true}
                                onLogout={handleLogout}
                                userRole={userRole}
                            />
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <div className="flex-1 flex flex-col w-full">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                        user={userProfile}
                    />

                    {/* Page Content */}
                    <main className="flex-1 overflow-auto p-4 sm:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
