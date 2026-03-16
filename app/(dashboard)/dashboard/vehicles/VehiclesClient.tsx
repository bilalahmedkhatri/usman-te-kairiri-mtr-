'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { VehicleInventoryCard } from '@/components/dashboard/vehicle-inventory-card';

// Define the shape of the vehicle data we expect from the server
export type VehicleData = {
    id: number;
    stockNumber: string;
    vinChassis: string;
    make: string;
    model: string;
    yearManufacture: number;
    priceFob: number;
    status: string;
    colorExterior: string;
    mileageKm: number;
    currentPort: string;
    imageUrl?: string;
    slug?: string;
};

interface VehiclesClientProps {
    initialVehicles: VehicleData[];
}

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

export default function VehiclesClient({ initialVehicles }: VehiclesClientProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [makeFilter, setMakeFilter] = useState('all');

    const filteredVehicles = useMemo(() => {
        return initialVehicles.filter(vehicle => {
            const matchesSearch =
                vehicle.stockNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (vehicle.vinChassis && vehicle.vinChassis.toLowerCase().includes(searchTerm.toLowerCase())) ||
                vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

            // Status filter - handling case-insensitive comparison
            const matchesStatus = statusFilter === 'all' || vehicle.status.toUpperCase() === statusFilter.toUpperCase();
            const matchesMake = makeFilter === 'all' || vehicle.make === makeFilter;
            return matchesSearch && matchesStatus && matchesMake;
        });
    }, [searchTerm, statusFilter, makeFilter, initialVehicles]);

    const makes = [...new Set(initialVehicles.map(v => v.make))];

    const statusColors: Record<string, string> = {
        AVAILABLE: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        RESERVED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        SOLD: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        SHIPPED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    };

    const handleEditVehicle = (vehicleId: number) => {
        router.push(`/dashboard/vehicles/${vehicleId}/edit`);
    };

    const handleDeleteVehicle = (vehicleId: number) => {
        if (confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
            console.log('Delete vehicle:', vehicleId);
            // Here you would typically call a server action or API to delete
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
                    onClick={() => router.push('/dashboard/vehicles/new')}
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
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{initialVehicles.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{initialVehicles.filter(v => v.status === 'AVAILABLE').length}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Reserved</p>
                    <p className="text-xl sm:text-2xl font-bold text-yellow-600">{initialVehicles.filter(v => v.status === 'RESERVED').length}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sold</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-600">{initialVehicles.filter(v => v.status === 'SOLD').length}</p>
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
                        aria-label="Filter by status"
                    >
                        <option value="all">All Status</option>
                        <option value="AVAILABLE">Available</option>
                        <option value="RESERVED">Reserved</option>
                        <option value="SOLD">Sold</option>
                        <option value="SHIPPED">Shipped</option>
                    </select>

                    <select
                        value={makeFilter}
                        onChange={(e) => setMakeFilter(e.target.value)}
                        className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        aria-label="Filter by make"
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
                    <VehicleInventoryCard
                        key={vehicle.id}
                        vehicle={{ ...vehicle, slug: vehicle.slug || `${vehicle.stockNumber}-${vehicle.id}` }} // Temporary fallback until server sends slug
                        onEdit={handleEditVehicle}
                        onDelete={handleDeleteVehicle}
                        statusColors={statusColors}
                    />
                ))}
                {filteredVehicles.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No vehicles found matching your criteria.
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
