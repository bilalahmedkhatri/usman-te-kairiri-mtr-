'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Users, DollarSign,
  Calendar, Filter, Download, Activity, Ship
} from 'lucide-react';
import dynamic from 'next/dynamic';

const SalesTrendChart = dynamic(() => import('@/components/dashboard/charts').then(mod => mod.SalesTrendChart), { ssr: false });
const RevenueTrendChart = dynamic(() => import('@/components/dashboard/charts').then(mod => mod.RevenueTrendChart), { ssr: false });
const VehicleTypesChart = dynamic(() => import('@/components/dashboard/charts').then(mod => mod.VehicleTypesChart), { ssr: false });

const MotionDiv = motion.div;
const MotionButton = motion.button;

const salesData = [
  { month: 'Jan', sales: 45, revenue: 38000000 },
  { month: 'Feb', sales: 52, revenue: 42000000 },
  { month: 'Mar', sales: 48, revenue: 39500000 },
  { month: 'Apr', sales: 61, revenue: 51000000 },
  { month: 'May', sales: 55, revenue: 46000000 },
  { month: 'Jun', sales: 67, revenue: 55000000 },
];

const vehicleTypes = [
  { name: 'SUV', value: 35, color: '#3b82f6' },
  { name: 'Sedan', value: 28, color: '#8b5cf6' },
  { name: 'Truck', value: 20, color: '#06b6d4' },
  { name: 'Bus', value: 10, color: '#10b981' },
  { name: 'Other', value: 7, color: '#f59e0b' },
];

export default function AnalyticsPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Analytics & Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track sales, inventory, and performance metrics</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <MotionButton
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Date Range
          </MotionButton>
          <MotionButton
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </MotionButton>
          <MotionButton
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </MotionButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">328</p>
              <p className="text-sm text-green-500 mt-1">↑ 12.5% from last month</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">¥271.5M</p>
              <p className="text-sm text-green-500 mt-1">↑ 18.3% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">1,842</p>
              <p className="text-sm text-green-500 mt-1">↑ 8.2% from last month</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">3.24%</p>
              <p className="text-sm text-red-500 mt-1">↓ 0.5% from last month</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <Activity className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </MotionDiv>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Sales Trend</h2>
          <SalesTrendChart data={salesData} />
        </MotionDiv>

        {/* Revenue Trend */}
        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Revenue Trend</h2>
          <RevenueTrendChart data={salesData} />
        </MotionDiv>

        {/* Vehicle Types Distribution */}
        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Vehicle Types</h2>
          <VehicleTypesChart data={vehicleTypes} colors={[]} />
        </MotionDiv>

        {/* Top Ports */}
        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Top Destination Ports</h2>
          <div className="space-y-3">
            {[
              { port: 'Mombasa', shipments: 156 },
              { port: 'Durban', shipments: 98 },
              { port: 'Dar es Salaam', shipments: 87 },
              { port: 'Lusaka', shipments: 45 },
            ].map((port, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Ship className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">{port.port}</span>
                </div>
                <span className="font-bold text-blue-600 dark:text-blue-400">{port.shipments}</span>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}