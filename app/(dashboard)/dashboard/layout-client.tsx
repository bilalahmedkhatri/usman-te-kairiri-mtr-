'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { Logo } from '@/components/Logo';

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    session: Session;
}

export default function DashboardLayoutClient({
    children,
    session
}: DashboardLayoutClientProps) {
    const [mounted, setMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarSide, setSidebarSide] = useState<'left' | 'right'>('left'); // Configurable side

    useEffect(() => {
        setMounted(true);
        // Responsive check: auto-close sidebar on small screens if needed
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    const userRole = session?.user?.role;
    const userProfile = session?.user || {};



    // Dynamic Logo (can be URL or Component)
    const logo = <Logo variant="stacked" />; // Replace with actual logo URL or component

    // Layout direction based on sidebar side
    const flexDirection = sidebarSide === 'left' ? 'flex-row' : 'flex-row-reverse';

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

            <div className={`flex ${flexDirection}`}>
                {/* Desktop Sticky Sidebar */}
                <motion.aside
                    initial={false}
                    animate={{ width: sidebarOpen ? 256 : 80 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`hidden lg:block bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 sticky top-0 h-screen overflow-y-auto shrink-0 z-20 ${sidebarSide === 'right' ? 'border-l border-r-0' : ''}`}
                >
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        onLogout={handleLogout}
                        userRole={userRole}
                        logo={logo}
                        onToggleSide={() => setSidebarSide(sidebarSide === 'left' ? 'right' : 'left')}
                    />
                </motion.aside>

                {/* Mobile Sidebar (Drawer) */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.aside
                            initial={{ x: sidebarSide === 'left' ? '-100%' : '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: sidebarSide === 'left' ? '-100%' : '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className={`fixed inset-y-0 ${sidebarSide === 'left' ? 'left-0' : 'right-0'} w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 lg:hidden shadow-2xl`}
                        >
                            <Sidebar
                                sidebarOpen={true}
                                onLogout={handleLogout}
                                userRole={userRole}
                                logo={logo}
                            />
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                        user={userProfile}
                        logo={logo}
                    />

                    {/* Page Content */}
                    <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
