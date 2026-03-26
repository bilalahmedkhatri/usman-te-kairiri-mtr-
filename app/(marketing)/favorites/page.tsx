"use client";

import { useFavorites } from "@/lib/store/favorites-store";
import { useQuery } from "@tanstack/react-query";
import { vehicleApi } from "@/lib/api";
import { VehicleCard } from "@/components/vehicle-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

export default function FavoritesPage() {
    const { favorites, clearAll } = useFavorites();

    // Fetch favorite vehicles (simplified - in production would batch fetch)
    const { data: vehicles, isLoading } = useQuery({
        queryKey: ["favorites", favorites],
        queryFn: async () => {
            if (favorites.length === 0) return [];
            // In production, you'd have a batch endpoint
            const allVehicles = await vehicleApi.getAll();
            return allVehicles.filter((v) => favorites.includes(v.id));
        },
        enabled: favorites.length > 0,
    });

    if (favorites.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-4xl font-bold font-heading mb-4">No Favorites Yet</h1>
                    <p className="text-muted-foreground mb-8">
                        Start adding vehicles to your favorites by clicking the heart icon on vehicle cards.
                    </p>
                    <Link href="/inventory">
                        <Button className="rounded-full gap-2">
                            <ArrowLeft className="w-4 h-4" /> Browse Inventory
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-heading mb-2">My Favorites</h1>
                    <p className="text-muted-foreground">
                        {favorites.length} vehicle{favorites.length !== 1 ? "s" : ""} saved
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={clearAll}>
                        Clear All
                    </Button>
                    <Link href="/inventory">
                        <Button variant="ghost">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(favorites.length)].map((_, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 rounded-xl h-[420px] animate-pulse border">
                            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-t-xl" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vehicles?.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            )}
        </div>
    );
}
