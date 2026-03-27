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
import { Search, Home, ChevronRight } from "lucide-react";
import Link from "next/link";

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

  // Client-side filtering
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          vehicle.make?.toLowerCase().includes(query) ||
          vehicle.model?.toLowerCase().includes(query) ||
          vehicle.title?.toLowerCase().includes(query);
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Inventory</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Vehicle Inventory
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our premium collection of Japanese vehicles
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by make, model, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 focus:border-primary shadow-sm"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <AdvancedFilters onFilterChange={setFilters} />
          </aside>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Results Summary Bar */}
            <div className="bg-white dark:bg-slate-900 border rounded-lg p-4 shadow-sm sticky top-20 z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm">
                  {isLoading ? (
                    <span className="text-muted-foreground">Loading...</span>
                  ) : (
                    <span>
                      Showing <span className="font-semibold text-foreground">{sortedVehicles.length}</span> of{" "}
                      <span className="font-semibold text-foreground">{vehicles.length}</span> vehicles
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <SortDropdown value={sortBy} onChange={setSortBy} />
                  <ViewToggle value={viewMode} onChange={setViewMode} />
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            <FilterChips
              filters={filters}
              onRemove={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-xl h-[450px] animate-pulse border shadow-sm">
                    <div className="h-72 bg-gray-200 dark:bg-gray-700 rounded-t-xl" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16 bg-destructive/10 rounded-xl border border-destructive/20">
                <p className="text-destructive font-semibold text-lg">
                  Error loading vehicles. Please try again.
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && sortedVehicles.length === 0 && (
              <div className="text-center py-24 bg-muted/30 rounded-xl border-2 border-dashed">
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold mb-3">No vehicles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query to find more results
                  </p>
                  <button
                    onClick={() => {
                      handleClearAllFilters();
                      setSearchQuery("");
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    Clear all filters and search
                  </button>
                </div>
              </div>
            )}

            {/* Vehicles Grid */}
            {!isLoading && !error && sortedVehicles.length > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {sortedVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
