"use client";

import { useQuery } from "@tanstack/react-query";
import { vehicleApi } from "@/lib/api";
import { ImageGallery } from "@/components/image-gallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CompareButton } from "@/components/compare-button";
import { FavoriteButton } from "@/components/favorite-button";
import { FeaturesGrid } from "@/components/vehicle-detail/features-grid";
import { ImportNotice } from "@/components/vehicle-detail/import-notice";
import { SpecsTable } from "@/components/vehicle-detail/specs-table";
import { ShippingCalculatorWidget } from "@/components/vehicle-detail/shipping-calculator-widget";
import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";

export default function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ["vehicle", params.id],
    queryFn: () => vehicleApi.getById(params.id),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-destructive text-lg">Vehicle not found</p>
        <Link href="/inventory">
          <Button className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Inventory
          </Button>
        </Link>
      </div>
    );
  }

  // Ensure we have images array
  const images = vehicle.image_urls && vehicle.image_urls.length > 0
    ? vehicle.image_urls
    : ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/inventory">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </Button>
      </Link>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column - Images & Details */}
        <div className="space-y-8">
          {/* Image Gallery */}
          <ImageGallery
            images={images}
            alt={`${vehicle.make} ${vehicle.model}`}
          />

          {/* Title & Price & Status */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary/80 uppercase tracking-wider mb-1">
                {vehicle.make}
              </p>
              <h1 className="text-4xl font-bold font-heading mb-2">
                {vehicle.title || `${vehicle.make} ${vehicle.model}`}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground">Stock:</span>
                  <span>{vehicle.stock_number || `T-${String(vehicle.id).slice(0, 6).toUpperCase()}`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{vehicle.location || "Japan"}</span>
                </div>
                {vehicle.status !== "available" && (
                  <Badge variant="destructive">{vehicle.status.toUpperCase()}</Badge>
                )}
                {vehicle.status === "available" && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                    Available
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2 self-start">
              <FavoriteButton vehicleId={vehicle.id} />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <p className="text-sm text-blue-900 dark:text-blue-100 mb-1 font-bold">FOB Price</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-blue-700 dark:text-blue-400 font-heading">
                {formatCurrency(vehicle.price || 0)}
              </p>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              * Shipping costs not included
            </p>
          </div>

          {/* Specifications Table */}
          <SpecsTable vehicle={vehicle} />

          {/* Import Notice */}
          <ImportNotice />

          {/* Features Grid */}
          <FeaturesGrid features={vehicle.features} />

          {/* Description */}
          {vehicle.description && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Vehicle Description</h2>
              <div className="text-muted-foreground leading-relaxed bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                {vehicle.description}
              </div>
            </div>
          )}

        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border rounded-xl p-6 sticky top-24 shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Interested in this car?
            </h3>

            <div className="space-y-3">
              <CompareButton vehicle={vehicle} className="w-full" />

              <ShippingCalculatorWidget
                vehiclePrice={vehicle.price || 0}
                vehicleM3={vehicle.specs?.cargo_capacity || 14}
              />

              <Separator className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">+81 45 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">sales@carsinternational.com</span>
                </div>
              </div>

              <Link href="/contact">
                <Button className="w-full mt-4 bg-slate-900 text-white hover:bg-slate-800" size="lg">
                  Request More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
