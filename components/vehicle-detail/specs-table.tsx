"use client";

import { Vehicle } from "@/lib/api";

interface SpecsTableProps {
    vehicle: Vehicle;
}

export function SpecsTable({ vehicle }: SpecsTableProps) {
    const specs = [
        { label: "Stock No", value: vehicle.stock_number || `T-${vehicle.id.slice(0, 6).toUpperCase()}` },
        { label: "Located Port", value: vehicle.specs.located_port || "Yokohama" },
        { label: "Grade", value: vehicle.specs.grade || vehicle.model.split(" ")[1] || "Base" },
        { label: "Seats", value: vehicle.specs.seats || 5 },
        { label: "Chassis", value: vehicle.specs.chassis_no || `ACU${vehicle.year}-${vehicle.id.slice(0, 5)}` },
        { label: "Shift", value: vehicle.specs.transmission || "Automatic" },
        { label: "Mileage", value: vehicle.specs.mileage ? `${(vehicle.specs.mileage).toLocaleString()}km` : "N/A" },
        { label: "Fuel Type", value: vehicle.specs.fuel_type || "Petrol" },
        { label: "Color", value: vehicle.specs.color || "Black" },
        { label: "Door", value: vehicle.specs.doors || 5 },
        { label: "Max loading", value: vehicle.specs.max_loading ? `${vehicle.specs.max_loading}kg` : "-" },
        { label: "Engine CC", value: vehicle.specs.engine_cc ? `${vehicle.specs.engine_cc}cc` : "2400cc" },
        { label: "Dimension", value: vehicle.specs.dimensions ? `${vehicle.specs.dimensions.length}×${vehicle.specs.dimensions.width}×${vehicle.specs.dimensions.height}` : "4.73×1.85×1.68" },
        { label: "m3", value: vehicle.specs.cargo_capacity ? `${vehicle.specs.cargo_capacity}` : "14.701" },
        { label: "Registration Year", value: vehicle.specs.registration_year || vehicle.year },
        { label: "Manufacture Year", value: vehicle.specs.manufacture_year || vehicle.year },
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
