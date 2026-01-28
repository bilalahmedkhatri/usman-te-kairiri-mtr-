'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Car, Anchor, DollarSign, 
  ArrowUpRight, Activity, BarChart3, UserPlus, Home, Settings, Ship
} from 'lucide-react';

const MotionDiv = motion.div;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export default function DashboardHome() {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12.5%', icon: Users, color: 'blue' },
    { label: 'Vehicles in Stock', value: '456', change: '+8.2%', icon: Car, color: 'green' },
    { label: 'Active Ports', value: '28', change: '+2.1%', icon: Anchor, color: 'purple' },
    { label: 'Revenue (JPY)', value: '¥45.2M', change: '+18.3%', icon: DollarSign, color: 'yellow' },
  ];

  const recentActivity = [
    { id: 1, action: 'New vehicle added', item: 'Toyota Harrier 2020', time: '2 min ago' },
    { id: 2, action: 'User registered', item: 'john@kenya.com', time: '15 min ago' },
    { id: 3, action: 'Port updated', item: 'Mombasa Port fees', time: '1 hour ago' },
    { id: 4, action: 'Vehicle sold', item: 'Honda Civic 2019', time: '2 hours ago' },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
      </MotionDiv>

      {/* Stats Grid */}
      <MotionDiv variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <MotionDiv
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </MotionDiv>
        ))}
      </MotionDiv>

      {/* Quick Actions */}
      <MotionDiv variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-3 font-medium"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add User</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-center gap-3 font-medium"
        >
          <Car className="w-5 h-5" />
          <span>Add Vehicle</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors flex items-center justify-center gap-3 font-medium"
        >
          <Anchor className="w-5 h-5" />
          <span>Add Port</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors flex items-center justify-center gap-3 font-medium"
        >
          <BarChart3 className="w-5 h-5" />
          <span>View Reports</span>
        </motion.button>
      </MotionDiv>

      {/* Recent Activity */}
      <MotionDiv variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {recentActivity.map((activity) => (
            <MotionDiv
              key={activity.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: 'var(--hover-bg)' }}
              className="p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.item}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}