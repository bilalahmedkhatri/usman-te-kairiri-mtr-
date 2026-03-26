"use client";

import { useQuery } from "@tanstack/react-query";
import { vehicleApi, Vehicle } from "@/lib/api";
import { VehicleCard } from "@/components/vehicle-card";
import { AdvancedFilters } from "@/components/advanced-filters";
import { FilterChips } from "@/components/filter-chips";
import { SortDropdown, type SortOption } from "@/components/sort-dropdown";
import { ViewToggle, type ViewMode } from "@/components/view-toggle";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Home, ChevronRight, Grid3x3, List, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface FilterState {
    transmission: string[];
    fuelType: string[];
    mileageRange: [number, number];
    condition: string[];
    features: string[];
    priceRange: [number, number];
    yearRange: [number, number];
    make: string[];
}

export default function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("popular");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        transmission: [],
        fuelType: [],
        mileageRange: [0, 200000],
        condition: [],
        features: [],
        priceRange: [0, 200000],
        yearRange: [1990, 2024],
        make: [],
    });

    const { data: vehicles = [], isLoading, error } = useQuery<Vehicle[]>({
        queryKey: ["vehicles"],
        queryFn: () => vehicleApi.getAll({ status: "available", limit: 100 }),
    });

    // Get unique makes from vehicles
    const availableMakes = useMemo(() => {
        const makes = new Set(vehicles.map(v => v.make).filter(Boolean));
        return Array.from(makes).sort();
    }, [vehicles]);

    // Client-side filtering
    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle) => {
            // Search query filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    vehicle.make?.toLowerCase().includes(query) ||
                    vehicle.model?.toLowerCase().includes(query) ||
                    vehicle.title?.toLowerCase().includes(query) ||
                    vehicle.year?.toString().includes(query);
                if (!matchesSearch) return false;
            }

            // Make filter
            if (filters.make.length > 0) {
                if (!filters.make.includes(vehicle.make || "")) return false;
            }

            // Transmission filter
            if (filters.transmission.length > 0) {
                const vehicleTransmission = vehicle.specs?.transmission || "Automatic";
                if (!filters.transmission.includes(vehicleTransmission)) return false;
            }

            // Fuel type filter
            if (filters.fuelType.length > 0) {
                const vehicleFuel = vehicle.specs?.fuel_type || "Petrol";
                if (!filters.fuelType.includes(vehicleFuel)) return false;
            }

            // Mileage range filter
            if (vehicle.specs?.mileage) {
                if (
                    vehicle.specs.mileage < filters.mileageRange[0] ||
                    vehicle.specs.mileage > filters.mileageRange[1]
                ) {
                    return false;
                }
            }

            // Price range filter
            if (vehicle.price) {
                if (
                    vehicle.price < filters.priceRange[0] ||
                    vehicle.price > filters.priceRange[1]
                ) {
                    return false;
                }
            }

            // Year range filter
            if (vehicle.year) {
                if (
                    vehicle.year < filters.yearRange[0] ||
                    vehicle.year > filters.yearRange[1]
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [vehicles, searchQuery, filters]);

    // Sorting
    const sortedVehicles = useMemo(() => {
        const sorted = [...filteredVehicles];
        switch (sortBy) {
            case "newest":
                return sorted.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
            case "price-asc":
                return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
            case "price-desc":
                return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
            case "year-desc":
                return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
            case "year-asc":
                return sorted.sort((a, b) => (a.year || 0) - (b.year || 0));
            case "mileage-asc":
                return sorted.sort((a, b) => (a.specs?.mileage || 0) - (b.specs?.mileage || 0));
            case "popular":
            default:
                return sorted;
        }
    }, [filteredVehicles, sortBy]);

    const handleRemoveFilter = (category: string, value?: string) => {
        if (category === "mileageRange") {
            setFilters((prev) => ({ ...prev, mileageRange: [0, 200000] }));
        } else if (category === "priceRange") {
            setFilters((prev) => ({ ...prev, priceRange: [0, 200000] }));
        } else if (category === "yearRange") {
            setFilters((prev) => ({ ...prev, yearRange: [1990, 2024] }));
        } else if (value) {
            setFilters((prev) => ({
                ...prev,
                [category]: prev[category as keyof FilterState].filter((item) => item !== value),
            }));
        }
    };

    const handleClearAllFilters = () => {
        setFilters({
            transmission: [],
            fuelType: [],
            mileageRange: [0, 200000],
            condition: [],
            features: [],
            priceRange: [0, 200000],
            yearRange: [1990, 2024],
            make: [],
        });
        setSearchQuery("");
    };

    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.transmission.length) count += filters.transmission.length;
        if (filters.fuelType.length) count += filters.fuelType.length;
        if (filters.make.length) count += filters.make.length;
        if (filters.mileageRange[0] > 0 || filters.mileageRange[1] < 200000) count++;
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) count++;
        if (filters.yearRange[0] > 1990 || filters.yearRange[1] < 2024) count++;
        if (searchQuery) count++;
        return count;
    }, [filters, searchQuery]);

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        Home
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">Inventory</span>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
                        Vehicle Inventory
                    </h1>
                    <p className="text-lg text-gray-600">
                        Browse our premium collection of Japanese vehicles
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search by make, model, year, or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 text-base border-gray-200 focus:border-red-500 shadow-sm rounded-xl"
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-[320px_1fr] gap-8">
                    {/* Desktop Filters Sidebar */}
                    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
                        <AdvancedFilters
                            onFilterChange={setFilters}
                            availableMakes={availableMakes}
                        />
                    </aside>

                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Results Summary Bar */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm sticky top-20 z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="text-sm text-gray-600">
                                    {isLoading ? (
                                        <span>Loading...</span>
                                    ) : (
                                        <span>
                                            Showing <span className="font-semibold text-gray-900">{sortedVehicles.length}</span> of{" "}
                                            <span className="font-semibold text-gray-900">{vehicles.length}</span> vehicles
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Mobile Filter Button */}
                                    <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="lg:hidden border-gray-200 rounded-xl">
                                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                                Filters
                                                {activeFiltersCount > 0 && (
                                                    <Badge className="ml-2 bg-red-600 text-white text-xs">
                                                        {activeFiltersCount}
                                                    </Badge>
                                                )}
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
                                            <div className="mt-6">
                                                <AdvancedFilters
                                                    onFilterChange={(newFilters) => {
                                                        setFilters(newFilters);
                                                        setIsMobileFilterOpen(false);
                                                    }}
                                                    availableMakes={availableMakes}
                                                />
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                    <SortDropdown value={sortBy} onChange={setSortBy} />
                                    <ViewToggle value={viewMode} onChange={setViewMode} />
                                </div>
                            </div>
                        </div>

                        {/* Active Filter Chips */}
                        {activeFiltersCount > 0 && (
                            <FilterChips
                                filters={filters}
                                onRemove={handleRemoveFilter}
                                onClearAll={handleClearAllFilters}
                                searchQuery={searchQuery}
                                onClearSearch={() => setSearchQuery("")}
                            />
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl h-[450px] animate-pulse border border-gray-200 shadow-sm">
                                        <div className="h-72 bg-gray-100 rounded-t-xl" />
                                        <div className="p-5 space-y-3">
                                            <div className="h-4 bg-gray-100 rounded w-3/4" />
                                            <div className="h-6 bg-gray-100 rounded w-full" />
                                            <div className="h-10 bg-gray-100 rounded w-full mt-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="text-center py-16 bg-red-50 rounded-xl border border-red-200">
                                <p className="text-red-600 font-semibold text-lg">
                                    Error loading vehicles. Please try again.
                                </p>
                                <Button
                                    onClick={() => window.location.reload()}
                                    variant="outline"
                                    className="mt-4 border-red-600 text-red-600 hover:bg-red-50"
                                >
                                    Retry
                                </Button>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && !error && sortedVehicles.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
                            >
                                <div className="max-w-md mx-auto">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No vehicles found</h3>
                                    <p className="text-gray-600 mb-6">
                                        Try adjusting your filters or search query to find more results
                                    </p>
                                    <Button
                                        onClick={handleClearAllFilters}
                                        className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                                    >
                                        Clear all filters and search
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Vehicles Grid/List */}
                        {!isLoading && !error && sortedVehicles.length > 0 && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className={
                                        viewMode === "grid"
                                            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                            : "flex flex-col gap-4"
                                    }
                                >
                                    {sortedVehicles.map((vehicle, index) => (
                                        <motion.div
                                            key={vehicle.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                        >
                                            <VehicleCard vehicle={vehicle} variant={viewMode === "list" ? "horizontal" : "default"} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}