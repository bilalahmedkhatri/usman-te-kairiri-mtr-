import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Vehicle } from '@/lib/api';

interface ComparisonStore {
    vehicles: Vehicle[];
    addVehicle: (vehicle: Vehicle) => void;
    removeVehicle: (vehicleId: string) => void;
    clearAll: () => void;
    isInComparison: (vehicleId: string) => boolean;
}

export const useComparison = create<ComparisonStore>()(
    persist(
        (set, get) => ({
            vehicles: [],

            addVehicle: (vehicle) =>
                set((state) => {
                    if (state.vehicles.some((v) => v.id === vehicle.id)) {
                        return state;
                    }
                    return { vehicles: [...state.vehicles, vehicle] };
                }),

            removeVehicle: (vehicleId) =>
                set((state) => ({
                    vehicles: state.vehicles.filter((v) => v.id !== vehicleId),
                })),

            clearAll: () => set({ vehicles: [] }),

            isInComparison: (vehicleId) =>
                get().vehicles.some((v) => v.id === vehicleId),
        }),
        {
            name: 'vehicle-comparison',
        }
    )
);
