'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Car,
    DollarSign,
    TrendingUp,
    Eye,
    Plus,
    Package,
    CheckCircle,
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

export default function DealerDashboard() {
    const stats = [
        {
            label: 'My Vehicles',
            value: '67',
            change: '+5',
            icon: Car,
            color: 'blue',
        },
        {
            label: 'Sold This Month',
            value: '12',
            change: '+2',
            icon: CheckCircle,
            color: 'green',
        },
        {
            label: 'Active Listings',
            value: '55',
            change: '+3',
            icon: Package,
            color: 'purple',
        },
        {
            label: 'My Revenue',
            value: '¥8.5M',
            change: '+22%',
            icon: DollarSign,
            color: 'yellow',
        },
        {
            label: 'Profile Views',
            value: '234',
            change: '+45',
            icon: Eye,
            color: 'indigo',
        },
    ];

    const recentVehicles = [
        {
            id: 1,
            make: 'Toyota',
            model: 'Harrier 2020',
            price: '¥2.5M',
            status: 'AVAILABLE',
            views: 45,
        },
        {
            id: 2,
            make: 'Honda',
            model: 'Civic 2019',
            price: '¥1.8M',
            status: 'RESERVED',
            views: 23,
        },
        {
            id: 3,
            make: 'Nissan',
            model: 'X-Trail 2021',
            price: '¥3.2M',
            status: 'AVAILABLE',
            views: 67,
        },
    ];

    const getStatusBadge = (status: string) => {
        const statusColors: Record<string, string> = {
            AVAILABLE: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
            RESERVED: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
            SOLD: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        };

        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
            >
                {status}
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
                    Dealer Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                    Manage your inventory and track sales performance
                </p>
            </MotionDiv>

            {/* Stats Grid */}
            <MotionDiv
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            >
                {stats.map((stat, index) => (
                    <MotionDiv
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div
                                className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}
                            >
                                <stat.icon
                                    className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                                />
                            </div>
                        </div>
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
                    </MotionDiv>
                ))}
            </MotionDiv>

            {/* Add Vehicle CTA */}
            <MotionDiv
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Add New Vehicle</h2>
                        <p className="text-blue-100">
                            List a new vehicle to your inventory
                        </p>
                    </div>
                    <Plus className="w-12 h-12" />
                </div>
            </MotionDiv>

            {/* Recent Listings */}
            <MotionDiv
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                            Recent Listings
                        </h2>
                        <button className="text-sm text-blue-500 hover:text-blue-600">
                            View All Vehicles
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {recentVehicles.map((vehicle) => (
                        <MotionDiv
                            key={vehicle.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                            className="p-4 flex items-center justify-between transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                    <Car className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-white">
                                        {vehicle.make} {vehicle.model}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {vehicle.price} • {vehicle.views} views
                                    </p>
                                </div>
                            </div>
                            {getStatusBadge(vehicle.status)}
                        </MotionDiv>
                    ))}
                </div>
            </MotionDiv>
        </MotionDiv>
    );
}
