'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Home, Users, Car, Anchor, BarChart3, Settings } from 'lucide-react';
import Image from 'next/image';

interface SidebarProps {
    sidebarOpen: boolean;
    onLogout: () => void;
    userRole?: string;
    logo?: React.ReactNode | string;
    onToggleSide?: () => void;
}

export function Sidebar({ sidebarOpen, onLogout, userRole = 'BUYER', logo, onToggleSide }: SidebarProps) {
    const pathname = usePathname();

    const allNavigation = [
        { icon: Home, label: 'Dashboard', href: '/dashboard', roles: ['BUYER', 'DEALER', 'ADMIN', 'SUPER_ADMIN'] },
        { icon: Users, label: 'Users', href: '/dashboard/users', roles: ['ADMIN', 'SUPER_ADMIN'] },
        { icon: Car, label: 'Vehicles', href: '/dashboard/vehicles', roles: ['DEALER', 'ADMIN', 'SUPER_ADMIN'] },
        { icon: Anchor, label: 'Ports', href: '/dashboard/ports', roles: ['ADMIN', 'SUPER_ADMIN'] },
        { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics', roles: ['ADMIN', 'SUPER_ADMIN'] },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings', roles: ['BUYER', 'DEALER', 'ADMIN', 'SUPER_ADMIN'] },
    ];

    const navigation = allNavigation.filter(item => item.roles.includes(userRole));

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 p-4">
                {sidebarOpen && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white"
                    >
                        {logo ? (
                            typeof logo === 'string' ? (
                                <div className="relative h-8 w-full">
                                    <Image src={logo} alt="Logo" fill className="object-contain object-left" />
                                </div>
                            ) : (
                                <div className="w-full">{logo}</div>
                            )
                        ) : (
                            "Vehicle Export System"
                        )}
                    </motion.h1>
                )}
            </div>

            <nav className="flex-1 space-y-4 px-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link href={item.href} key={item.href} className="my-4">
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

                {onToggleSide && sidebarOpen && (
                    <motion.button
                        onClick={onToggleSide}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center py-2 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mt-2"
                    >
                        Switch Sidebar Side
                    </motion.button>
                )}
            </div>
        </div>
    );
}
