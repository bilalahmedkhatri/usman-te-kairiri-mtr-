"use client";

import { useQuery } from "@tanstack/react-query";
import type { VehicleFilters } from "@/lib/api";
import { taxonomyApi, vehicleApi } from "@/lib/api";
import { VEHICLE_TYPES, FUEL_TYPES, VEHICLE_COUNTRIES, BODY_TYPES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface EnhancedVehicleFiltersProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
}

export function EnhancedVehicleFilters({
  filters,
  onFiltersChange,
}: EnhancedVehicleFiltersProps) {
  const { data: taxonomy } = useQuery({
    queryKey: ["taxonomy"],
    queryFn: () => taxonomyApi.getAll(),
  });

  const { data: models } = useQuery({
    queryKey: ["models", filters.make],
    queryFn: () => taxonomyApi.getModels(filters.make),
    enabled: !!filters.make,
  });

  const updateFilter = (key: keyof VehicleFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  // Reset model when maker changes
  useEffect(() => {
    if (filters.make && !models?.includes(filters.model || "")) {
      updateFilter("model", undefined);
    }
  }, [filters.make, models]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Search & Filter Vehicles</h3>
      </div>

      <div className="space-y-3">
        {/* Select Maker */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Label htmlFor="make" className="text-sm font-medium text-gray-700">Maker</Label>
            <Select
              value={filters.make || "all"}
              onValueChange={(value) =>
                updateFilter("make", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id="make" className="mt-1">
                <SelectValue placeholder="All Makers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makers</SelectItem>
                {taxonomy?.makers.map((maker) => (
                  <SelectItem key={maker} value={maker}>
                    {maker}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Select Model (dependent on Maker) */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Label htmlFor="model" className="text-sm font-medium text-gray-700">Model</Label>
            <Select
              value={filters.model || "all"}
              onValueChange={(value) =>
                updateFilter("model", value === "all" ? undefined : value)
              }
              disabled={!filters.make}
            >
              <SelectTrigger id="model" className="mt-1">
                <SelectValue placeholder={filters.make ? "All Models" : "Select Maker First"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {models?.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Select Type */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0V1m10 3V1m0 3l1 1v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5l1-1z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Label htmlFor="body_type" className="text-sm font-medium text-gray-700">Vehicle Type</Label>
            <Select
              value={filters.body_type || "all"}
              onValueChange={(value) =>
                updateFilter("body_type", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id="body_type" className="mt-1">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {VEHICLE_TYPES.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    <div className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Select Body Type */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-cyan-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Label htmlFor="body_type_filter" className="text-sm font-medium text-gray-700">Body Type</Label>
            <Select
              value={filters.body_type || "all"}
              onValueChange={(value) =>
                updateFilter("body_type", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id="body_type_filter" className="mt-1">
                <SelectValue placeholder="All Body Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Body Types</SelectItem>
                {BODY_TYPES.map((bodyType) => (
                  <SelectItem key={bodyType} value={bodyType}>
                    {bodyType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Select Fuel */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Label htmlFor="fuel_type" className="text-sm font-medium text-gray-700">Fuel Type</Label>
            <Select
              value={filters.fuel_type || "all"}
              onValueChange={(value) =>
                updateFilter("fuel_type", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id="fuel_type" className="mt-1">
                <SelectValue placeholder="All Fuel Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fuel Types</SelectItem>
                {FUEL_TYPES.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Select Car Location */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">Country</Label>
            <Select
              value={filters.location || "all"}
              onValueChange={(value) =>
                updateFilter("location", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id="location" className="mt-1">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {VEHICLE_COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enter a Record (Stock Number/Keyword) */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700">Stock Number / Keyword</Label>
            <Input
              id="search"
              placeholder="Search by stock number or keyword..."
              value={filters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Year Range */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-teal-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <Label className="text-sm font-medium text-gray-700">Year Range</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="year_min"
                type="number"
                placeholder="Min Year"
                value={filters.year_min || ""}
                onChange={(e) =>
                  updateFilter("year_min", e.target.value ? parseInt(e.target.value) : undefined)
                }
                className="text-sm"
              />
              <Input
                id="year_max"
                type="number"
                placeholder="Max Year"
                value={filters.year_max || ""}
                onChange={(e) =>
                  updateFilter("year_max", e.target.value ? parseInt(e.target.value) : undefined)
                }
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
