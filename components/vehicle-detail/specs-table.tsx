"use client";

import { Vehicle } from "@/lib/api";

interface SpecsTableProps {
    vehicle: Vehicle;
}

export function SpecsTable({ vehicle }: SpecsTableProps) {
    const specs = [
        { label: "Stock No", value: vehicle.stock_number || `T-${String(vehicle.id).toUpperCase()}` },
        { label: "Located Port", value: vehicle.logistics?.current_port?.name || "Yokohama" },
        { label: "Grade", value: vehicle.specs?.trim_grade || vehicle.model.split(" ")[1] || "Base" },
        { label: "Seats", value: vehicle.specs?.seats || 5 },
        { label: "Chassis", value: vehicle.vin_chassis || `ACU${vehicle.year || vehicle.year_manufacture}-${String(vehicle.id)}` },
        { label: "Shift", value: vehicle.specs?.transmission || "Automatic" },
        { label: "Mileage", value: vehicle.specs?.mileage_km ? `${(vehicle.specs.mileage_km).toLocaleString()}km` : "N/A" },
        { label: "Fuel Type", value: vehicle.specs?.fuel_type || "Petrol" },
        { label: "Color", value: vehicle.specs?.color_exterior || "Black" },
        { label: "Door", value: vehicle.specs?.doors || 5 },
        { label: "Max loading", value: vehicle.logistics?.max_loading_kg ? `${vehicle.logistics.max_loading_kg}kg` : "-" },
        { label: "Engine CC", value: vehicle.specs?.engine_cc ? `${vehicle.specs.engine_cc}cc` : "2400cc" },
        { label: "Dimension", value: vehicle.logistics?.length_cm ? `${vehicle.logistics.length_cm}×${vehicle.logistics.width_cm}×${vehicle.logistics.height_cm}` : "4.73×1.85×1.68" },
        { label: "m3", value: vehicle.logistics?.m3 ? `${vehicle.logistics.m3}` : "14.701" },
        { label: "Registration Year", value: vehicle.year_registration || vehicle.year || vehicle.year_manufacture },
        { label: "Manufacture Year", value: vehicle.year_manufacture || vehicle.year },
    ];

    return (
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
            <div className="bg-emerald-800 text-white px-4 py-2 font-bold text-sm uppercase tracking-wide">
                Car Specs
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
                {specs.map((item, index) => (
                    <div
                        key={item.label}
                        className={`flex border-b last:border-b-0 md:last:border-b-0 ${index % 2 === 0 ? "md:border-r" : ""
                            }`}
                    >
                        <div className="w-1/3 bg-slate-50 dark:bg-slate-950/50 p-3 font-semibold text-slate-700 dark:text-slate-300 border-r">
                            {item.label}
                        </div>
                        <div className="w-2/3 p-3 text-slate-900 dark:text-slate-100 flex items-center">
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
