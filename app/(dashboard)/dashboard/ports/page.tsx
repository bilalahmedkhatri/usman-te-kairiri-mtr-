'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Plus, Edit2, Trash2, Anchor, MapPin, Globe,
  Filter, Ship, MoreVertical
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Port = {
  id: number;
  name: string;
  country: string;
  region: string;
  is_destination: boolean;
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

export default function PortsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock port data based on schema
  const ports: Port[] = [
    { id: 1, name: 'Yokohama', country: 'Japan', region: 'East Asia', is_destination: false, created_at: '2024-01-01' },
    { id: 2, name: 'Mombasa', country: 'Kenya', region: 'East Africa', is_destination: true, created_at: '2024-01-01' },
    { id: 3, name: 'Durban', country: 'South Africa', region: 'Southern Africa', is_destination: true, created_at: '2024-01-01' },
    { id: 4, name: 'Nagoya', country: 'Japan', region: 'East Asia', is_destination: false, created_at: '2024-01-01' },
    { id: 5, name: 'Kobe', country: 'Japan', region: 'East Asia', is_destination: false, created_at: '2024-01-01' },
    { id: 6, name: 'Dar es Salaam', country: 'Tanzania', region: 'East Africa', is_destination: true, created_at: '2024-01-01' },
    { id: 7, name: 'Lusaka', country: 'Zambia', region: 'Southern Africa', is_destination: true, created_at: '2024-01-01' },
  ];

  const filteredPorts = useMemo(() => {
    return ports.filter(port => {
      const matchesSearch = port.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        port.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'all' || port.region === regionFilter;
      const matchesType = typeFilter === 'all' ||
        (typeFilter === 'destination' && port.is_destination) ||
        (typeFilter === 'origin' && !port.is_destination);
      return matchesSearch && matchesRegion && matchesType;
    });
  }, [searchTerm, regionFilter, typeFilter]);

  const regions = [...new Set(ports.map(p => p.region))];

  const handleEditPort = (portId: number) => {
    router.push(`/ports/${portId}/edit`);
  };

  const handleDeletePort = (portId: number) => {
    if (confirm('Are you sure you want to delete this port? This will affect shipping calculations.')) {
      console.log('Delete port:', portId);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Port Management</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Manage shipping ports and routes</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/dashboard/ports/new')}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Port</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Ports</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{ports.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Origin Ports</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{ports.filter(p => !p.is_destination).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Destination Ports</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{ports.filter(p => p.is_destination).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Regions</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">{regions.length}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by port name or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="origin">Origin Ports</option>
            <option value="destination">Destination Ports</option>
          </select>
        </div>
      </motion.div>

      {/* Ports Table */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Port</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Country</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Region</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Created</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredPorts.map((port) => (
                <motion.tr
                  key={port.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                  className="transition-colors"
                >
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Anchor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{port.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{port.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-3 h-3" />
                      <span>{port.country}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {port.region}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${port.is_destination
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                      {port.is_destination ? 'Destination' : 'Origin'}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden lg:table-cell text-sm text-gray-500 dark:text-gray-400">
                    {port.created_at}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEditPort(port.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDeletePort(port.id)}
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
              Showing {filteredPorts.length} of {ports.length} ports
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