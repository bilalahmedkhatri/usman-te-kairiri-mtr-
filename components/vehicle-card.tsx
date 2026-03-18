"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Vehicle } from "@/lib/api";
import { formatCurrency } from "@/lib/format";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const mainImage =
    vehicle.image_urls && vehicle.image_urls.length > 0
      ? vehicle.image_urls[0]
      : "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      data-testid="vehicle-card"
    >
      <Link href={`/inventory/${vehicle.id}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          {/* Image Container with Location Chip */}
          <div className="relative w-full h-48 overflow-hidden">
            <motion.div layoutId={`vehicle-image-${vehicle.id}`}>
              <Image
                src={mainImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </motion.div>

            {/* Location Chip on Top Right */}
            {vehicle.location && (
              <div className="absolute top-2 right-2 bg-blue-600/80 text-white px-2 py-1 rounded text-xs font-medium">
                {vehicle.location}
              </div>
            )}

            {/* Status Badge if not available */}
            {vehicle.status !== "available" && (
              <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-semibold">
                {vehicle.status.toUpperCase()}
              </div>
            )}
          </div>

          {/* Content Below Image */}
          <div className="p-4">
            {/* Brand Title */}
            <h3 className="text-lg font-semibold hover:text-primary transition-colors">
              {vehicle.title || `${vehicle.make} ${vehicle.model}`}
            </h3>

            {/* Year and Mileage with Light Color */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Year: {vehicle.year || vehicle.year_manufacture}</span>
              {vehicle.specs?.mileage_km && (
                <span>{vehicle.specs.mileage_km.toLocaleString()} km</span>
              )}
            </div>

            {/* Price */}
            <div>
              <p className="text-xl font-bold text-primary">{formatCurrency(vehicle.price)}</p>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

interface NewArrivalsProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

export function NewArrivals({ vehicles, isLoading }: NewArrivalsProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <VehicleCard vehicle={vehicle} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
