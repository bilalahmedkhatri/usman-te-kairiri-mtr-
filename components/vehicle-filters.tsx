"use client";

import type { VehicleFilters } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VehicleFiltersProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
}

export function VehicleFilters({
  filters,
  onFiltersChange,
}: VehicleFiltersProps) {
  const updateFilter = (key: keyof VehicleFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              placeholder="Toyota, Honda..."
              value={filters.make || ""}
              onChange={(e) => updateFilter("make", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              placeholder="Prius, Civic..."
              value={filters.model || ""}
              onChange={(e) => updateFilter("model", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="year-min">Year (Min)</Label>
            <Input
              id="year-min"
              type="number"
              placeholder="2010"
              value={filters.year_min || ""}
              onChange={(e) =>
                updateFilter("year_min", e.target.value ? parseInt(e.target.value) : undefined)
              }
            />
          </div>

          <div>
            <Label htmlFor="year-max">Year (Max)</Label>
            <Input
              id="year-max"
              type="number"
              placeholder="2024"
              value={filters.year_max || ""}
              onChange={(e) =>
                updateFilter("year_max", e.target.value ? parseInt(e.target.value) : undefined)
              }
            />
          </div>

          <div>
            <Label htmlFor="price-min">Price (Min)</Label>
            <Input
              id="price-min"
              type="number"
              placeholder="10000"
              value={filters.price_min || ""}
              onChange={(e) =>
                updateFilter("price_min", e.target.value ? parseFloat(e.target.value) : undefined)
              }
            />
          </div>

          <div>
            <Label htmlFor="price-max">Price (Max)</Label>
            <Input
              id="price-max"
              type="number"
              placeholder="50000"
              value={filters.price_max || ""}
              onChange={(e) =>
                updateFilter("price_max", e.target.value ? parseFloat(e.target.value) : undefined)
              }
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) =>
                updateFilter("status", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
