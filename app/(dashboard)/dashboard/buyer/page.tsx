'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    ShoppingCart,
    Package,
    Truck,
    DollarSign,
    TrendingUp,
    Search,
    Star,
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

export default function BuyerDashboard() {
    const stats = [
        {
            label: 'Wishlist Items',
            value: '8',
            change: '+2',
            icon: Heart,
            color: 'pink',
        },
        {
            label: 'My Purchases',
            value: '3',
            change: '+0',
            icon: Package,
            color: 'blue',
        },
        {
            label: 'In Cart',
            value: '2',
            change: '+1',
            icon: ShoppingCart,
            color: 'purple',
        },
        {
            label: 'Total Spent',
            value: '¥12.5M',
            change: '',
            icon: DollarSign,
            color: 'green',
        },
    ];

    const wishlistItems = [
        {
            id: 1,
            make: 'Toyota',
            model: 'Land Cruiser 2021',
            price: '¥5.2M',
            dealer: 'Tokyo Auto Exports',
            rating: 4.8,
        },
        {
            id: 2,
            make: 'BMW',
            model: 'X5 2020',
            price: '¥3.8M',
            dealer: 'Osaka Motors',
            rating: 4.9,
        },
        {
            id: 3,
            make: 'Mercedes',
            model: 'GLE 2022',
            price: '¥6.1M',
            dealer: 'Kyoto Premium Cars',
            rating: 5.0,
        },
    ];

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
                    Buyer Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                    Browse, save, and purchase your dream vehicles
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
                                {stat.change && (
                                    <div className="flex items-center mt-2">
                                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                        <span className="text-sm font-medium text-green-500">
                                            {stat.change}
                                        </span>
                                    </div>
                                )}
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

            {/* Browse CTA */}
            <MotionDiv
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Browse Vehicles</h2>
                        <p className="text-blue-100">
                            Discover thousands of quality vehicles from trusted dealers
                        </p>
                    </div>
                    <Search className="w-12 h-12" />
                </div>
            </MotionDiv>

            {/* Wishlist */}
            <MotionDiv
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                            My Wishlist
                        </h2>
                        <button className="text-sm text-blue-500 hover:text-blue-600">
                            View All
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {wishlistItems.map((item) => (
                        <MotionDiv
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                            className="p-4 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                        <Package className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">
                                            {item.make} {item.model}
                                        </p>
                                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                                            {item.price}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {item.dealer}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {item.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-pink-500 hover:text-pink-600">
                                    <Heart className="w-5 h-5 fill-pink-500" />
                                </button>
                            </div>
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
                        label: 'My Cart',
                        icon: ShoppingCart,
                        href: '/dashboard/buyer/cart',
                        color: 'from-purple-500 to-purple-600',
                    },
                    {
                        label: 'My Purchases',
                        icon: Package,
                        href: '/dashboard/buyer/purchases',
                        color: 'from-blue-500 to-blue-600',
                    },
                    {
                        label: 'Track Shipment',
                        icon: Truck,
                        href: '/dashboard/buyer/shipments',
                        color: 'from-green-500 to-green-600',
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
