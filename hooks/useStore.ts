import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Car, CartItem, ComparisonItem, FilterState, User } from '@/types';

interface StoreState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Cars
  cars: Car[];
  setCars: (cars: Car[]) => void;

  // Wishlist
  wishlist: string[];
  addToWishlist: (carId: string) => void;
  removeFromWishlist: (carId: string) => void;
  toggleWishlist: (carId: string) => void;
  isInWishlist: (carId: string) => boolean;

  // Cart (Inquiry)
  cart: CartItem[];
  addToCart: (carId: string) => void;
  removeFromCart: (carId: string) => void;
  clearCart: () => void;
  isInCart: (carId: string) => boolean;

  // Comparison
  comparison: ComparisonItem[];
  addToComparison: (carId: string) => void;
  removeFromComparison: (carId: string) => void;
  clearComparison: () => void;
  isInComparison: (carId: string) => boolean;
  getComparisonCars: (allCars: Car[]) => Car[];

  // Filters
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;

  // UI State
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const initialFilterState: FilterState = {
  make: [],
  model: [],
  year: [1990, 2024],
  price: [0, 500000],
  transmission: [],
  fuel: [],
  condition: [],
  location: [],
  sortBy: 'latest',
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),

      // Cars
      cars: [],
      setCars: (cars) => set({ cars }),

      // Wishlist
      wishlist: [],
      addToWishlist: (carId) => {
        const { wishlist } = get();
        if (!wishlist.includes(carId)) {
          set({ wishlist: [...wishlist, carId] });
        }
      },
      removeFromWishlist: (carId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter(id => id !== carId) });
      },
      toggleWishlist: (carId) => {
        const { addToWishlist, removeFromWishlist, isInWishlist } = get();
        if (isInWishlist(carId)) {
          removeFromWishlist(carId);
        } else {
          addToWishlist(carId);
        }
      },
      isInWishlist: (carId) => {
        const { wishlist } = get();
        return wishlist.includes(carId);
      },

      // Cart
      cart: [],
      addToCart: (carId) => {
        const { cart } = get();
        if (!cart.some(item => item.carId === carId)) {
          set({ cart: [...cart, { carId, addedAt: new Date().toISOString() }] });
        }
      },
      removeFromCart: (carId) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.carId !== carId) });
      },
      clearCart: () => set({ cart: [] }),
      isInCart: (carId) => {
        const { cart } = get();
        return cart.some(item => item.carId === carId);
      },

      // Comparison
      comparison: [],
      addToComparison: (carId) => {
        const { comparison } = get();
        if (comparison.length < 3 && !comparison.some(item => item.carId === carId)) {
          set({ comparison: [...comparison, { carId, addedAt: new Date().toISOString() }] });
        }
      },
      removeFromComparison: (carId) => {
        const { comparison } = get();
        set({ comparison: comparison.filter(item => item.carId !== carId) });
      },
      clearComparison: () => set({ comparison: [] }),
      isInComparison: (carId) => {
        const { comparison } = get();
        return comparison.some(item => item.carId === carId);
      },
      getComparisonCars: (allCars) => {
        const { comparison } = get();
        return comparison
          .map(item => allCars.find(car => car.id === item.carId))
          .filter(Boolean) as Car[];
      },

      // Filters
      filters: initialFilterState,
      setFilters: (filters) => set({ filters }),
      updateFilter: (key, value) => {
        const { filters } = get();
        set({ filters: { ...filters, [key]: value } });
      },
      clearFilters: () => set({ filters: initialFilterState }),

      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'Japanese-export-store',
      partialize: (state) => ({
        wishlist: state.wishlist,
        cart: state.cart,
        comparison: state.comparison,
        filters: state.filters,
        theme: state.theme,
        searchQuery: state.searchQuery,
      }),
    }
  )
);
