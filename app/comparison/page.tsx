"use client";

import React from "react";
import { useComparison } from "@/lib/store/comparison-store";
import { type Vehicle } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowLeft, Calendar, Gauge, Fuel, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { motion } from "framer-motion";

export default function ComparisonPage() {
    const { vehicles, removeVehicle, clearAll } = useComparison();

    if (vehicles.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-4xl font-bold font-heading mb-6">Vehicle Comparison</h1>
                <p className="text-muted-foreground mb-8">
                    You haven&apos;t added any vehicles to compare yet.
                </p>
                <Link href="/inventory">
                    <Button className="rounded-full gap-2">
                        <ArrowLeft className="w-4 h-4" /> Browse Inventory
                    </Button>
                </Link>
            </div>
        );
    }

    const specs = [
        { label: "Year", key: (v: Vehicle) => v.year, icon: Calendar },
        { label: "Mileage", key: (v: Vehicle) => v.specs?.mileage_km ? `${(v.specs.mileage_km / 1000).toFixed(0)}k km` : "N/A", icon: Gauge },
        { label: "Fuel Type", key: (v: Vehicle) => v.specs?.fuel_type || "N/A", icon: Fuel },
        { label: "Transmission", key: (v: Vehicle) => v.specs?.transmission || "N/A", icon: null },
        { label: "Engine", key: (v: Vehicle) => v.specs?.engine_cc ? `${v.specs.engine_cc}cc` : "N/A", icon: null },
        { label: "Drive", key: (v: Vehicle) => v.specs?.drive_type || "N/A", icon: null },
        { label: "Color", key: (v: Vehicle) => v.specs?.color_exterior || "N/A", icon: null },
        { label: "Location", key: (v: Vehicle) => v.location || "Japan", icon: MapPin },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-heading mb-2">Compare Vehicles</h1>
                    <p className="text-muted-foreground">
                        Comparing {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={clearAll}>
                        Clear All
                    </Button>
                    <Link href="/inventory">
                        <Button variant="ghost">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)` }}>
                    {/* Header Row */}
                    <div className="font-semibold text-sm text-muted-foreground flex items-end pb-2">
                        Specification
                    </div>
                    {vehicles.map((vehicle) => (
                        <motion.div
                            key={vehicle.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative bg-white dark:bg-slate-900 rounded-t-xl border p-4"
                        >
                            <button
                                onClick={() => removeVehicle(vehicle.id)}
                                className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-white hover:bg-destructive/90"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={vehicle.image_urls?.[0] || "https://via.placeholder.com/300"}
                                    alt={`${vehicle.make} ${vehicle.model}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-lg mb-1">
                                {vehicle.make} {vehicle.model}
                            </h3>
                            <p className="text-2xl font-bold text-primary font-heading">
                                {formatCurrency(vehicle.price || 0)}
                            </p>
                        </motion.div>
                    ))}

                    {/* Spec Rows */}
                    {specs.map((spec) => (
                        <React.Fragment key={spec.label}>
                            <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-4 py-3 rounded">
                                {spec.icon && <spec.icon className="w-4 h-4 text-muted-foreground" />}
                                {spec.label}
                            </div>
                            {vehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className="bg-white dark:bg-slate-900 border px-4 py-3 flex items-center"
                                >
                                    <span className="text-sm">{spec.key(vehicle)}</span>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}

                    {/* Action Row */}
                    <div />
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white dark:bg-slate-900 border border-t-0 rounded-b-xl p-4">
                            <Link href={`/inventory/${vehicle.id}`}>
                                <Button className="w-full">View Details</Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-6">
                {vehicles.map((vehicle) => (
                    <motion.div
                        key={vehicle.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-xl border p-4"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">
                                    {vehicle.make} {vehicle.model}
                                </h3>
                                <p className="text-xl font-bold text-primary font-heading">
                                    {formatCurrency(vehicle.price || 0)}
                                </p>
                            </div>
                            <button
                                onClick={() => removeVehicle(vehicle.id)}
                                className="p-1 rounded-full bg-destructive text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                            <Image
                                src={vehicle.image_urls?.[0] || "https://via.placeholder.com/300"}
                                alt={`${vehicle.make} ${vehicle.model}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-2">
                            {specs.map((spec) => (
                                <div key={spec.label} className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{spec.label}:</span>
                                    <span className="font-medium">{spec.key(vehicle)}</span>
                                </div>
                            ))}
                        </div>
                        <Link href={`/inventory/${vehicle.id}`} className="mt-4 block">
                            <Button className="w-full">View Details</Button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
