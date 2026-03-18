'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    Car, Calendar, Palette, Gauge, MapPin,
    DollarSign, Edit2, Trash2, Loader2
} from 'lucide-react';

export interface VehicleCardData {
    id: number;
    slug: string;
    stockNumber: string;
    make: string;
    model: string;
    yearManufacture: number;
    priceFob: number;
    status: string;
    colorExterior: string;
    mileageKm: number;
    currentPort: string;
    imageUrl?: string;
}

interface VehicleInventoryCardProps {
    vehicle: VehicleCardData;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    statusColors: Record<string, string>;
}

export function VehicleInventoryCard({
    vehicle,
    onEdit,
    onDelete,
    statusColors
}: VehicleInventoryCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        // If we are already loading, prevent multiple clicks
        if (isLoading) {
            e.preventDefault();
            return;
        }
        setIsLoading(true);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden relative group"
        >
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Loading...</span>
                    </div>
                </div>
            )}

            <Link
                href={`/dashboard/vehicles/${vehicle.slug}`}
                className="flex flex-col h-full"
                onClick={handleClick}
            >
                {/* Vehicle Image */}
                <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden shrink-0">
                    {vehicle.imageUrl ? (
                        <Image
                            src={vehicle.imageUrl}
                            alt={`${vehicle.make} ${vehicle.model}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            priority={false}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Car className="w-16 h-16 text-gray-400" />
                        </div>
                    )}
                </div>

                <div className="p-4 flex-grow">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
                                {vehicle.make} {vehicle.model}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Stock: {vehicle.stockNumber}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[vehicle.status] || 'bg-gray-100 text-gray-800'}`}>
                            {vehicle.status}
                        </span>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span>{vehicle.yearManufacture}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Palette className="w-4 h-4" />
                            <span>{vehicle.colorExterior || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Gauge className="w-4 h-4" />
                            <span>{vehicle.mileageKm ? vehicle.mileageKm.toLocaleString() : '0'} km</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span>{vehicle.currentPort || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center justify-between p-4 pt-0 border-t-0 mt-auto">
                <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-gray-800 dark:text-white">
                        ¥{vehicle.priceFob.toLocaleString()}
                    </span>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                            e.preventDefault();
                            onEdit(vehicle.id);
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Edit vehicle"
                    >
                        <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                            e.preventDefault();
                            onDelete(vehicle.id);
                        }}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                        aria-label="Delete vehicle"
                    >
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
