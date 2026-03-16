'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Menu, Sun, Moon, ChevronLeft, LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    isMobile?: boolean; // To conditionally render mobile/desktop triggers
    logo?: React.ReactNode | string;
}

export function Header({
    sidebarOpen,
    setSidebarOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    // user prop is available if needed for future profile section
    logo
}: HeaderProps) {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <motion.header
            initial={{ y: -70 }}
            animate={{ y: 0 }}
            className="dark:bg-gray-900 px-4 sm:px-6 py-3 sticky top-0 z-30"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 max-w-2xl">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-3"
                        aria-label="Toggle mobile menu"
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

                {/* Logo Section for Mobile/Centered */}
                {logo && (
                    <div className="flex-1 flex justify-center lg:hidden absolute left-1/2 transform -translate-x-1/2">
                        {typeof logo === 'string' ? (
                            <Image src={logo} alt="Logo" width={40} height={40} className="object-contain" />
                        ) : (
                            logo
                        )}
                    </div>
                )}

                <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Notifications"
                    >
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={toggleTheme}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle theme"
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
                        aria-label="Toggle sidebar"
                    >
                        <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <Link href="/dashboard/profile">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Profile"
                        >
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
                        onClick={() => signOut({ callbackUrl: '/' })}
                        aria-label="Logout"
                    >
                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
}
