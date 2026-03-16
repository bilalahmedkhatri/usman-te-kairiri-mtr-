import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
    favorites: number[]; // Vehicle IDs
    addFavorite: (vehicleId: number) => void;
    removeFavorite: (vehicleId: number) => void;
    toggleFavorite: (vehicleId: number) => void;
    isFavorite: (vehicleId: number) => boolean;
    clearAll: () => void;
}

export const useFavorites = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (vehicleId) =>
                set((state) => {
                    if (state.favorites.includes(vehicleId)) {
                        return state;
                    }
                    return { favorites: [...state.favorites, vehicleId] };
                }),

            removeFavorite: (vehicleId) =>
                set((state) => ({
                    favorites: state.favorites.filter((id) => id !== vehicleId),
                })),

            toggleFavorite: (vehicleId) =>
                set((state) => {
                    if (state.favorites.includes(vehicleId)) {
                        return { favorites: state.favorites.filter((id) => id !== vehicleId) };
                    }
                    return { favorites: [...state.favorites, vehicleId] };
                }),

            isFavorite: (vehicleId) => get().favorites.includes(vehicleId),

            clearAll: () => set({ favorites: [] }),
        }),
        {
            name: 'vehicle-favorites',
        }
    )
);
