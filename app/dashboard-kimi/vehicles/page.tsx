'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Plus, Filter, MoreVertical, Edit2, Trash2, Car, 
  MapPin, DollarSign, Calendar, Gauge, Palette, Settings
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Vehicle = {
  id: number;
  stock_number: string;
  vin_chassis: string;
  make: string;
  model: string;
  year_manufacture: number;
  price_fob: number;
  status: 'available' | 'reserved' | 'sold' | 'shipped';
  color_exterior: string;
  mileage_km: number;
  current_port: string;
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

export default function VehiclesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [makeFilter, setMakeFilter] = useState('all');

  // Mock vehicle data based on schema
  const vehicles: Vehicle[] = [
    { id: 1, stock_number: 'STK001', vin_chassis: 'JTDBE32K700123456', make: 'Toyota', model: 'Harrier', year_manufacture: 2020, price_fob: 8500000, status: 'available', color_exterior: 'Pearl White', mileage_km: 45000, current_port: 'Yokohama' },
    { id: 2, stock_number: 'STK002', vin_chassis: 'JTDZN3EUXFJ123457', make: 'Honda', model: 'Civic', year_manufacture: 2019, price_fob: 3200000, status: 'reserved', color_exterior: 'Silver', mileage_km: 68000, current_port: 'Nagoya' },
    { id: 3, stock_number: 'STK003', vin_chassis: 'JTDY211K600123458', make: 'Toyota', model: 'Hiace', year_manufacture: 2018, price_fob: 4200000, status: 'sold', color_exterior: 'White', mileage_km: 125000, current_port: 'Osaka' },
    { id: 4, stock_number: 'STK004', vin_chassis: 'JTDSP供养123459', make: 'Nissan', model: 'Caravan', year_manufacture: 2021, price_fob: 3800000, status: 'available', color_exterior: 'Black', mileage_km: 35000, current_port: 'Yokohama' },
    { id: 5, stock_number: 'STK005', vin_chassis: 'JTDKB走行距離123460', make: 'Toyota', model: 'Vitz', year_manufacture: 2022, price_fob: 2800000, status: 'available', color_exterior: 'Red', mileage_km: 15000, current_port: 'Kobe' },
  ];

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch = vehicle.stock_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.vin_chassis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
      const matchesMake = makeFilter === 'all' || vehicle.make === makeFilter;
      return matchesSearch && matchesStatus && matchesMake;
    });
  }, [searchTerm, statusFilter, makeFilter]);

  const makes = [...new Set(vehicles.map(v => v.make))];
  const statusColors = {
    available: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    reserved: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    sold: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  };

  const handleEditVehicle = (vehicleId: number) => {
    router.push(`/vehicles/${vehicleId}/edit`);
  };

  const handleDeleteVehicle = (vehicleId: number) => {
    if (confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      console.log('Delete vehicle:', vehicleId);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Vehicle Inventory</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Manage vehicle stock and specifications</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/dashboard-kimi/vehicles/new')}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Vehicle</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Vehicles</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{vehicles.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{vehicles.filter(v => v.status === 'available').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Reserved</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">{vehicles.filter(v => v.status === 'reserved').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Sold</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{vehicles.filter(v => v.status === 'sold').length}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by stock #, VIN, make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
            <option value="shipped">Shipped</option>
          </select>

          <select
            value={makeFilter}
            onChange={(e) => setMakeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All Makes</option>
            {makes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Vehicles Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            {/* Vehicle Image Placeholder */}
            <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Car className="w-16 h-16 text-gray-400" />
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{vehicle.make} {vehicle.model}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Stock: {vehicle.stock_number}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[vehicle.status]}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{vehicle.year_manufacture}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Palette className="w-4 h-4" />
                  <span>{vehicle.color_exterior}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Gauge className="w-4 h-4" />
                  <span>{vehicle.mileage_km.toLocaleString()} km</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{vehicle.current_port}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-gray-800 dark:text-white">
                    ¥{vehicle.price_fob.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleEditVehicle(vehicle.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}