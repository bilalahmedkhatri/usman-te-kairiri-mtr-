'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Plus, MoreVertical, Mail, Phone, MapPin,
  Edit2, Trash2, UserPlus, Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  email: string;
  name: string;
  country: string;
  phone: string;
  role: 'buyer' | 'dealer' | 'admin';
  created_at: string;
};

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

export default function UsersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  // Mock data based on schema
  const users: User[] = [
    { id: 1, email: 'john@example.com', name: 'John Doe', country: 'Kenya', phone: '+254712345678', role: 'buyer', created_at: '2024-01-15' },
    { id: 2, email: 'jane@example.com', name: 'Jane Smith', country: 'Tanzania', phone: '+255784567890', role: 'dealer', created_at: '2024-01-20' },
    { id: 3, email: 'admin@hokira.com', name: 'Admin User', country: 'Japan', phone: '+81312345678', role: 'admin', created_at: '2024-01-01' },
    { id: 4, email: 'bob@example.com', name: 'Bob Johnson', country: 'Kenya', phone: '+254723456789', role: 'buyer', created_at: '2024-02-01' },
    { id: 5, email: 'alice@example.com', name: 'Alice Brown', country: 'Uganda', phone: '+256701234567', role: 'dealer', created_at: '2024-02-05' },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm);
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesCountry = countryFilter === 'all' || user.country === countryFilter;
      return matchesSearch && matchesRole && matchesCountry;
    });
  }, [searchTerm, roleFilter, countryFilter]);

  const countries = [...new Set(users.map(u => u.country))];

  const handleEditUser = (userId: number) => {
    router.push(`/users/${userId}/edit`);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', userId);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">User Management</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Manage buyers, dealers, and administrators</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/dashboard/users/new')}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add User</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{users.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Buyers</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'buyer').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Dealers</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'dealer').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{users.filter(u => u.role === 'admin').length}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All Roles</option>
            <option value="buyer">Buyers</option>
            <option value="dealer">Dealers</option>
            <option value="admin">Admins</option>
          </select>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Country</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                  className="transition-colors"
                >
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === 'admin'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : user.role === 'dealer'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-3 h-3" />
                      <span>{user.country}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden lg:table-cell text-sm text-gray-500 dark:text-gray-400">
                    {user.created_at}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEditUser(user.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}