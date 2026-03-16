'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Package,
    DollarSign,
    TrendingUp,
    ShoppingCart,
    Warehouse,
    AlertCircle,
    Truck,
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

export default function SupplierDashboard() {
    const stats = [
        {
            label: 'Active Orders',
            value: '34',
            change: '+8',
            icon: ShoppingCart,
            color: 'blue',
        },
        {
            label: 'Parts in Stock',
            value: '1,245',
            change: '-23',
            icon: Warehouse,
            color: 'green',
        },
        {
            label: 'Pending Delivery',
            value: '18',
            change: '+2',
            icon: Truck,
            color: 'yellow',
        },
        {
            label: 'My Revenue',
            value: '¥3.2M',
            change: '+12%',
            icon: DollarSign,
            color: 'purple',
        },
    ];

    const recentOrders = [
        {
            id: 1,
            item: 'Engine Parts Set',
            customer: 'Tokyo Auto Exports',
            status: 'PENDING',
            amount: '¥150,000',
        },
        {
            id: 2,
            item: 'Brake System',
            customer: 'Osaka Motors',
            status: 'IN_TRANSIT',
            amount: '¥85,000',
        },
        {
            id: 3,
            item: 'Suspension Kit',
            customer: 'Kyoto Auto',
            status: 'DELIVERED',
            amount: '¥120,000',
        },
    ];

    const getStatusBadge = (status: string) => {
        const statusColors: Record<string, string> = {
            PENDING: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
            IN_TRANSIT: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
            DELIVERED: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
        };

        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
            >
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
                    Supplier Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                    Manage your supplies, orders, and inventory
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
                                    <TrendingUp
                                        className={`w-4 h-4 ${stat.change.startsWith('+')
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            } mr-1`}
                                    />
                                    <span
                                        className={`text-sm font-medium ${stat.change.startsWith('+')
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}
                                    >
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

            {/* Low Stock Alert */}
            <MotionDiv
                variants={itemVariants}
                className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6"
            >
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-yellow-900 dark:text-yellow-200">
                            Low Stock Alert
                        </h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                            5 items are running low on stock. Consider restocking soon.
                        </p>
                    </div>
                </div>
            </MotionDiv>

            {/* Recent Orders */}
            <MotionDiv
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                            Recent Orders
                        </h2>
                        <button className="text-sm text-blue-500 hover:text-blue-600">
                            View All Orders
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {recentOrders.map((order) => (
                        <MotionDiv
                            key={order.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                            className="p-4 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 dark:text-white">
                                        {order.item}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Customer: {order.customer}
                                    </p>
                                </div>
                                {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {order.amount}
                            </p>
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
                        label: 'Manage Inventory',
                        icon: Warehouse,
                        href: '/dashboard/supplier/inventory',
                        color: 'from-green-500 to-green-600',
                    },
                    {
                        label: 'View Orders',
                        icon: ShoppingCart,
                        href: '/dashboard/supplier/orders',
                        color: 'from-blue-500 to-blue-600',
                    },
                    {
                        label: 'My Invoices',
                        icon: DollarSign,
                        href: '/dashboard/supplier/invoices',
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
