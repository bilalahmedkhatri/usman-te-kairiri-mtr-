"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterChipsProps {
    filters: {
        transmission: string[];
        fuelType: string[];
        mileageRange: [number, number];
        condition: string[];
        features: string[];
        priceRange: [number, number];
        yearRange: [number, number];
        make: string[];
    };
    onRemove: (category: string, value?: string) => void;
    onClearAll: () => void;
    searchQuery?: string;
    onClearSearch?: () => void;
}

export function FilterChips({ 
    filters, 
    onRemove, 
    onClearAll, 
    searchQuery, 
    onClearSearch 
}: FilterChipsProps) {
    const activeFilters: { category: string; value: string; label: string }[] = [];

    // Collect all active filters
    filters.make.forEach((m) =>
        activeFilters.push({ category: "make", value: m, label: `Make: ${m}` })
    );
    filters.transmission.forEach((t) =>
        activeFilters.push({ category: "transmission", value: t, label: t })
    );
    filters.fuelType.forEach((f) =>
        activeFilters.push({ category: "fuelType", value: f, label: f })
    );
    filters.condition.forEach((c) =>
        activeFilters.push({ category: "condition", value: c, label: c })
    );
    filters.features.forEach((f) =>
        activeFilters.push({ category: "features", value: f, label: f })
    );

    // Add mileage if not default
    if (filters.mileageRange[0] !== 0 || filters.mileageRange[1] !== 200000) {
        activeFilters.push({
            category: "mileageRange",
            value: "range",
            label: `Mileage: ${filters.mileageRange[0].toLocaleString()} - ${filters.mileageRange[1].toLocaleString()} km`,
        });
    }

    // Add price if not default
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 200000) {
        activeFilters.push({
            category: "priceRange",
            value: "range",
            label: `Price: $${filters.priceRange[0].toLocaleString()} - $${filters.priceRange[1].toLocaleString()}`,
        });
    }

    // Add year if not default
    if (filters.yearRange[0] !== 1990 || filters.yearRange[1] !== 2024) {
        activeFilters.push({
            category: "yearRange",
            value: "range",
            label: `Year: ${filters.yearRange[0]} - ${filters.yearRange[1]}`,
        });
    }

    if (!activeFilters.length && !searchQuery) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 py-4">
            <span className="text-sm text-muted-foreground font-medium">Active Filters:</span>
            
            {searchQuery && (
                <Badge
                    variant="secondary"
                    className="gap-1 pl-3 pr-2 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border-red-200 transition-colors"
                >
                    <span>Search: "{searchQuery}"</span>
                    <button
                        onClick={onClearSearch}
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-red-200 p-0.5"
                    >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Clear search</span>
                    </button>
                </Badge>
            )}
            {activeFilters.map((filter, index) => (
                <Badge
                    key={`${filter.category}-${index}`}
                    variant="secondary"
                    className="gap-1 pl-3 pr-2 py-1.5 hover:bg-secondary/80 transition-colors"
                >
                    <span>{filter.label}</span>
                    <button
                        onClick={() => onRemove(filter.category, filter.value)}
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-muted-foreground/20 p-0.5"
                    >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {filter.label} filter</span>
                    </button>
                </Badge>
            ))}
            {activeFilters.length > 1 && (
                <button
                    onClick={onClearAll}
                    className="text-sm text-primary hover:underline font-medium ml-2"
                >
                    Clear all
                </button>
            )}
        </div>
    );
}
