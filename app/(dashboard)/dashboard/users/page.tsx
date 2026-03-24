'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Phone, Edit2, Trash2, UserPlus,
  ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUsers, deleteUser, type UserData } from '@/app/actions/get-users';
import { useDebounce } from '@/hooks/use-debounce';

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
  const [users, setUsers] = useState<UserData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Fetch users function
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getUsers({
        page,
        limit: 20,
        search: debouncedSearch,
        role: roleFilter,
        status: statusFilter,
      });

      setUsers(result.users);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch, roleFilter, statusFilter]);

  // Fetch users on mount and when dependencies change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, roleFilter, statusFilter]);

  const handleEditUser = (userId: number) => {
    router.push(`/dashboard/users/edit?id=${userId}`);
  };

  const handleDeleteUser = async (userId: number) => {
    if (confirm('Permanently delete this user?')) {
      const result = await deleteUser(userId);
      if (result.success) {
        // Refresh the list
        fetchUsers();
      } else {
        alert('Failed to delete user');
      }
    }
  };

  // Calculate role counts from current users
  const roleCounts = {
    admin: users.filter(u => u.role === 'ADMIN').length,
    manager: users.filter(u => u.role === 'MANAGER').length,
    user: users.filter(u => u.role === 'USER').length,
    dealer: users.filter(u => u.role === 'DEALER').length,
    supplier: users.filter(u => u.role === 'SUPPLIER').length,
    buyer: users.filter(u => u.role === 'BUYER').length,
    viewer: users.filter(u => u.role === 'VIEWER').length,
  };

  // Helper function to get role badge color
  const getRoleBadgeClass = (role: string) => {
    const roleMap: Record<string, string> = {
      ADMIN: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      MANAGER: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      DEALER: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      SUPPLIER: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      BUYER: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      VIEWER: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      USER: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    };
    return roleMap[role] || roleMap.USER;
  };

  // Helper function to get status badge color
  const getStatusBadgeClass = (status: string) => {
    return status === 'ACTIVE'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
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
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Manage all users, dealers, suppliers, and buyers</p>
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
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{total}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{roleCounts.admin}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Managers</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">{roleCounts.manager}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Dealers</p>
          <p className="text-xl sm:text-2xl font-bold text-orange-600">{roleCounts.dealer}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Suppliers</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{roleCounts.supplier}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Buyers</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">{roleCounts.buyer}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <label htmlFor="role-filters">Role</label>
          <select
            id="role-filters"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All Roles</option>
            <option value="ADMIN">Admins</option>
            <option value="MANAGER">Managers</option>
            <option value="USER">Users</option>
            <option value="DEALER">Dealers</option>
            <option value="SUPPLIER">Suppliers</option>
            <option value="BUYER">Buyers</option>
            <option value="VIEWER">Viewers</option>
          </select>

          <label htmlFor="status-filters">Filters</label>
          <select
            id="status-filters"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading users...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No users found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Contact</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Department</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Status</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{user.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Phone className="w-3 h-3" />
                          <span className="text-xs">{user.phone || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleBadgeClass(user.role)}`}>
                          {user.role.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {user.department || '-'}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusBadgeClass(user.status)}`}>
                          {user.status.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditUser(user.id)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {((page - 1) * 20) + 1} to {Math.min(page * 20, total)} of {total} users
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || isLoading}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </motion.button>

                <div className="hidden sm:flex gap-1">
                  {getPageNumbers().map((pageNum, idx) => (
                    pageNum === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-3 py-1.5 text-gray-500">...</span>
                    ) : (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPage(pageNum as number)}
                        disabled={isLoading}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${page === pageNum
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {pageNum}
                      </motion.button>
                    )
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || isLoading}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}