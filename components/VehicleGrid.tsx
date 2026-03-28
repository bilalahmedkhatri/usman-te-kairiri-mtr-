// components/VehicleGrid.tsx
'use client';

import { CarCard } from '@/components/cards/CarCard';
import type { Car } from '@/types';

interface VehicleGridProps {
    vehicles: Car[];
}

export function VehicleGrid({ vehicles }: VehicleGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
                <CarCard key={vehicle.id} car={vehicle} index={index} />
            ))}
        </div>
    );
}