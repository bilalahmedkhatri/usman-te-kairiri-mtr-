'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Users, Car, DollarSign, Activity,
    TrendingUp, Settings,
    FileText, Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

// Stats Card Component
interface StatsCardProps {
    title: string;
    value: string;
    change: number;
    icon: React.ElementType;
    color: string;
}

const StatsCard = ({ title, value, change, icon: Icon, color }: StatsCardProps) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                {Math.abs(change)}%
            </span>
        </div>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </motion.div>
);

export default function AdminDashboard() {
    // Mock Data
    const stats = [
        { title: 'Total Users', value: '1,234', change: 12.5, icon: Users, color: 'bg-blue-500' },
        { title: 'Total Revenue', value: '$45,231', change: 8.2, icon: DollarSign, color: 'bg-green-500' },
        { title: 'Vehicles In Stock', value: '856', change: -2.4, icon: Car, color: 'bg-purple-500' },
        { title: 'Active Listings', value: '2,345', change: 15.3, icon: Activity, color: 'bg-orange-500' },
    ];

    const recentActivity = [
        { user: 'John Doe', action: 'registered as a new user', time: '2 min ago' },
        { user: 'Sarah Smith', action: 'purchased a Honda Vezel', time: '15 min ago' },
        { user: 'Mike Johnson', action: 'updated profile details', time: '1 hour ago' },
        { user: 'Admin System', action: 'completed daily backup', time: '3 hours ago' },
    ];

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back, here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Users / Quick Actions */}
                    <Card className="border-none shadow-sm dark:bg-gray-900">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { label: 'Add Vehicle', icon: Car, href: '/dashboard/vehicles/new', color: 'bg-blue-100 text-blue-600' },
                                    { label: 'Manage Users', icon: Users, href: '/dashboard/users', color: 'bg-purple-100 text-purple-600' },
                                    { label: 'View Reports', icon: FileText, href: '/dashboard/reports', color: 'bg-green-100 text-green-600' },
                                    { label: 'Settings', icon: Settings, href: '/dashboard/settings', color: 'bg-gray-100 text-gray-600' },
                                ].map((action, i) => (
                                    <Link key={i} href={action.href}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer h-full"
                                        >
                                            <div className={`p-3 rounded-full mb-3 ${action.color}`}>
                                                <action.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{action.label}</span>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chart Area (Placeholder) */}
                    <Card className="border-none shadow-sm dark:bg-gray-900">
                        <CardHeader>
                            <CardTitle>Revenue Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl m-4">
                            <p className="text-gray-400">Chart Visualization Placeholder</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar / Recent Activity */}
                <div className="space-y-8">
                    <Card className="border-none shadow-sm dark:bg-gray-900">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {recentActivity.map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                <span className="font-semibold">{item.user}</span> {item.action}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Shield className="w-8 h-8 opacity-80" />
                                <div>
                                    <h3 className="font-bold text-lg">System Status</h3>
                                    <p className="text-indigo-100 text-sm">All systems operational</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm opacity-90">
                                    <span>Server Load</span>
                                    <span>24%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-1.5">
                                    <div className="bg-white h-full rounded-full w-1/4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
