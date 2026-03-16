"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, SlidersHorizontal } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export interface FilterState {
    transmission: string[];
    fuelType: string[];
    mileageRange: [number, number];
    condition: string[];
    features: string[];
}

interface AdvancedFiltersProps {
    onFilterChange?: (filters: FilterState) => void;
}

export function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
    const [filters, setFilters] = useState<FilterState>({
        transmission: [],
        fuelType: [],
        mileageRange: [0, 200000],
        condition: [],
        features: [],
    });

    const transmissionOptions = ["Automatic", "Manual", "CVT", "Semi-Automatic"];
    const fuelTypeOptions = ["Petrol", "Diesel", "Hybrid", "Electric", "LPG"];
    const conditionOptions = ["Excellent", "Good", "Fair"];
    const featuresOptions = [
        "Sunroof",
        "Leather Seats",
        "Navigation",
        "Backup Camera",
        "Heated Seats",
        "Bluetooth",
        "Cruise Control",
        "Alloy Wheels",
    ];

    const handleCheckboxChange = (
        category: keyof Pick<FilterState, "transmission" | "fuelType" | "condition" | "features">,
        value: string
    ) => {
        setFilters((prev) => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];

            const newFilters = { ...prev, [category]: updated };
            onFilterChange?.(newFilters);
            return newFilters;
        });
    };

    const handleMileageChange = (value: number[]) => {
        const newFilters = { ...filters, mileageRange: [value[0], value[1]] as [number, number] };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const clearFilters = () => {
        const resetFilters: FilterState = {
            transmission: [],
            fuelType: [],
            mileageRange: [0, 200000],
            condition: [],
            features: [],
        };
        setFilters(resetFilters);
        onFilterChange?.(resetFilters);
    };

    const activeFilterCount =
        filters.transmission.length +
        filters.fuelType.length +
        filters.condition.length +
        filters.features.length +
        (filters.mileageRange[0] !== 0 || filters.mileageRange[1] !== 200000 ? 1 : 0);

    const FilterContent = () => (
        <div className="space-y-6 pb-6">
            {/* Transmission */}
            <div>
                <Label className="text-base font-semibold mb-3 block">Transmission</Label>
                <div className="space-y-2">
                    {transmissionOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                                id={`trans-${option}`}
                                checked={filters.transmission.includes(option)}
                                onCheckedChange={() => handleCheckboxChange("transmission", option)}
                            />
                            <label
                                htmlFor={`trans-${option}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Fuel Type */}
            <div>
                <Label className="text-base font-semibold mb-3 block">Fuel Type</Label>
                <div className="space-y-2">
                    {fuelTypeOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                                id={`fuel-${option}`}
                                checked={filters.fuelType.includes(option)}
                                onCheckedChange={() => handleCheckboxChange("fuelType", option)}
                            />
                            <label
                                htmlFor={`fuel-${option}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Mileage Range */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <Label className="text-base font-semibold">Mileage Range (km)</Label>
                    <span className="text-sm text-muted-foreground font-mono">
                        {filters.mileageRange[0].toLocaleString()} - {filters.mileageRange[1].toLocaleString()}
                    </span>
                </div>
                <Slider
                    min={0}
                    max={200000}
                    step={1000}
                    value={filters.mileageRange}
                    onValueChange={handleMileageChange}
                    className="mt-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0 km</span>
                    <span>200k km</span>
                </div>
            </div>

            <Separator />

            {/* Condition */}
            <div>
                <Label className="text-base font-semibold mb-3 block">Condition</Label>
                <div className="space-y-2">
                    {conditionOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                                id={`cond-${option}`}
                                checked={filters.condition.includes(option)}
                                onCheckedChange={() => handleCheckboxChange("condition", option)}
                            />
                            <label
                                htmlFor={`cond-${option}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Features */}
            <div>
                <Label className="text-base font-semibold mb-3 block">Features</Label>
                <div className="grid grid-cols-2 gap-2">
                    {featuresOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                                id={`feat-${option}`}
                                checked={filters.features.includes(option)}
                                onCheckedChange={() => handleCheckboxChange("features", option)}
                            />
                            <label
                                htmlFor={`feat-${option}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
                disabled={activeFilterCount === 0}
            >
                <X className="w-4 h-4 mr-2" /> Clear All Filters
            </Button>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold font-heading">Filters</h3>
                    {activeFilterCount > 0 && (
                        <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </div>
                <FilterContent />
            </div>

            {/* Mobile Sheet */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs">
                                {activeFilterCount}
                            </span>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Advanced Filters</SheetTitle>
                        <SheetDescription>
                            Refine your search with detailed filters
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                        <FilterContent />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
