'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    MessageSquare,
    Calendar,
    Users,
    Car,
    TrendingUp,
    Store,
    AlertCircle,
    CheckCircle,
    Clock,
} from 'lucide-react';

const MotionDiv = motion.div;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 },
    },
};

export default function ManagerDashboard() {
    const stats = [
        {
            label: 'Open Inquiries',
            value: '23',
            change: '+5',
            icon: MessageSquare,
            color: 'blue',
        },
        {
            label: 'Active Bookings',
            value: '45',
            change: '+12',
            icon: Calendar,
            color: 'green',
        },
        {
            label: 'Dealers Active',
            value: '156',
            change: '+3',
            icon: Store,
            color: 'purple',
        },
        {
            label: 'Sales Today',
            value: '¥2.3M',
            change: '+15%',
            icon: TrendingUp,
            color: 'yellow',
        },
    ];

    const recentInquiries = [
        {
            id: 1,
            type: 'VEHICLE_INQUIRY',
            from: 'John Doe',
            subject: 'Inquiry about Toyota Harrier 2020',
            status: 'OPEN',
            time: '5 min ago',
        },
        {
            id: 2,
            type: 'DEALER_CONTACT',
            from: 'Sarah Smith',
            subject: 'Want to contact Tokyo Auto Exports',
            status: 'IN_PROGRESS',
            time: '30 min ago',
        },
        {
            id: 3,
            type: 'GENERAL',
            from: 'Mike Johnson',
            subject: 'Payment inquiry',
            status: 'RESOLVED',
            time: '2 hours ago',
        },
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<
            string,
            { bg: string; text: string; icon: any }
        > = {
            OPEN: {
                bg: 'bg-red-100 dark:bg-red-900/20',
                text: 'text-red-600 dark:text-red-400',
                icon: AlertCircle,
            },
            IN_PROGRESS: {
                bg: 'bg-yellow-100 dark:bg-yellow-900/20',
                text: 'text-yellow-600 dark:text-yellow-400',
                icon: Clock,
            },
            RESOLVED: {
                bg: 'bg-green-100 dark:bg-green-900/20',
                text: 'text-green-600 dark:text-green-400',
                icon: CheckCircle,
            },
        };

        const config = statusConfig[status] || statusConfig.OPEN;
        const Icon = config.icon;

        return (
            <span
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
            >
                <Icon className="w-3 h-3" />
                {status.replace('_', ' ')}
            </span>
        );
    };

    return (
        <MotionDiv
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header */}
            <MotionDiv variants={itemVariants}>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Manager Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                    Manage inquiries, bookings, and dealer communications
                </p>
            </MotionDiv>

            {/* Stats Grid */}
            <MotionDiv
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {stats.map((stat, index) => (
                    <MotionDiv
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                </p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-1">
                                    {stat.value}
                                </p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-sm font-medium text-green-500">
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div
                                className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}
                            >
                                <stat.icon
                                    className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                                />
                            </div>
                        </div>
                    </MotionDiv>
                ))}
            </MotionDiv>

            {/* Recent Inquiries */}
            <MotionDiv
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                            Recent Inquiries
                        </h2>
                        <button className="text-sm text-blue-500 hover:text-blue-600">
                            View All
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {recentInquiries.map((inquiry) => (
                        <MotionDiv
                            key={inquiry.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                            className="p-4 transition-colors cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 dark:text-white">
                                        {inquiry.subject}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        From: {inquiry.from} • {inquiry.type.replace('_', ' ')}
                                    </p>
                                </div>
                                {getStatusBadge(inquiry.status)}
                            </div>
                            <span className="text-xs text-gray-400">{inquiry.time}</span>
                        </MotionDiv>
                    ))}
                </div>
            </MotionDiv>

            {/* Quick Actions */}
            <MotionDiv
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
                {[
                    {
                        label: 'View All Inquiries',
                        icon: MessageSquare,
                        href: '/dashboard/inquiries',
                        color: 'from-blue-500 to-blue-600',
                    },
                    {
                        label: 'Manage Bookings',
                        icon: Calendar,
                        href: '/dashboard/bookings',
                        color: 'from-green-500 to-green-600',
                    },
                    {
                        label: 'View Dealers',
                        icon: Store,
                        href: '/dashboard/dealers',
                        color: 'from-purple-500 to-purple-600',
                    },
                ].map((action, index) => (
                    <MotionDiv
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-gradient-to-br ${action.color} rounded-xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
                    >
                        <action.icon className="w-8 h-8 mb-3" />
                        <h3 className="font-semibold">{action.label}</h3>
                    </MotionDiv>
                ))}
            </MotionDiv>
        </MotionDiv>
    );
}
