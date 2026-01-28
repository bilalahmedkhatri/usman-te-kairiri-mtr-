"use client";

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper to determine tenant slug from hostname
const getTenantSlug = () => {
  if (typeof window === "undefined") return "default";

  const hostname = window.location.hostname;

  // Examples:
  // "hokirainternational.org" -> "hokirainternational"
  // "admin.hokirainternational.org" -> "hokirainternational" (if subdomains used)
  // "localhost" -> "default"

  if (hostname === "localhost") return "default";

  const parts = hostname.split(".");
  // Logic: Extract the main domain name part
  if (parts.length >= 2) {
    return parts[0]; // simplistic approach, refine for prod
  }
  return parts[0];
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Types ---
export interface VehicleSpecs {
  engine_code?: string;
  engine_cc?: number;
  fuel_type?: string;
  transmission?: string;
  drive_type?: string;
  steering?: string;
  seats?: number;
  doors?: number;
  color_exterior?: string;
  color_interior?: string;
  trim_grade?: string;
  mileage_km?: number;
  vehicle_type?: string;
  options?: Record<string, any>;
  [key: string]: any;
}

export interface VehicleLogistics {
  length_cm?: number;
  width_cm?: number;
  height_cm?: number;
  m3?: number;
  weight_kg?: number;
  max_loading_kg?: number;
  origin_country?: string;
  hs_code?: string;
  current_port?: { id: number; name: string };
  inspection_status?: string;
  [key: string]: any;
}

export interface Vehicle {
  id: number;
  stock_number?: string;
  vin_chassis: string;
  title?: string;
  make: string;
  model: string;
  year_manufacture: number;
  year_registration?: number;
  price_fob: number;
  status: "available" | "reserved" | "sold" | "shipped";
  image_urls: string[];
  description?: string;
  specs?: VehicleSpecs;
  logistics?: VehicleLogistics;

  // Helpers
  features?: string[];
  location?: string;
  price?: number;
  year?: number;

  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  country: string;
  content?: string;
  rating?: number;
  customer_name?: string;
  customer_email?: string;
  images: string[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  status?: string;
  search?: string;
  skip?: number;
  limit?: number;
  sort?: string;
}

export interface ShippingCalculation {
  vehicle_id: number;
  shipping_port: string;
  shipping_cost: number;
  total_price: number;
}

export interface Taxonomy {
  makers: string[];
  body_types: string[];
  fuel_types: string[];
  locations: string[];
}

export interface Settings {
  company_name?: string;
  address?: string;
  phone?: string;
  email_primary?: string;
  [key: string]: string | undefined;
}

// --- API Methods using Dynamic Paths ---

export const vehicleApi = {
  getAll: async (filters?: VehicleFilters): Promise<Vehicle[]> => {
    const slug = getTenantSlug();
    const response = await api.get(`/api/${slug}/vehicles`, { params: filters });

    // Transform
    return response.data.map((v: any) => ({
      ...v,
      id: v.id,
      price: v.price_fob,
      year: v.year_manufacture,
      location: v.logistics?.origin_country || "Japan",
      features: v.features || (v.specs?.options ? Object.keys(v.specs.options) : [])
    }));
  },

  getById: async (id: string | number): Promise<Vehicle> => {
    const slug = getTenantSlug();
    const response = await api.get(`/api/${slug}/vehicles/${id}`);
    const data = response.data;

    return {
      ...data,
      price: data.price_fob,
      year: data.year_manufacture,
      location: data.logistics?.origin_country || "Japan",
      features: data.features || (data.specs?.options ? Object.keys(data.specs.options) : [])
    };
  },

  calculateShipping: async (
    vehicleId: string | number,
    shippingPort: string
  ): Promise<ShippingCalculation> => {
    const slug = getTenantSlug();
    const response = await api.post(`/api/${slug}/shipping/calculate`, null, {
      params: { vehicle_id: vehicleId, shipping_port: shippingPort },
    });
    return response.data;
  },
};

export const taxonomyApi = {
  getAll: async (): Promise<Taxonomy> => {
    const slug = getTenantSlug();
    const response = await api.get(`/api/${slug}/taxonomy`);
    return response.data;
  },

  getModels: async (make?: string): Promise<string[]> => {
    // Models might be global or site specific, for now using global structure if not isolated in API
    // If main.py defined models inside tenant path, update here. 
    // Assuming taxonomy handles models logic or generic listing.
    // Let's assume we query vehicles to get models for the site
    const slug = getTenantSlug();
    // Re-using taxonomy for models or a raw vehicle query if no specific models endpoint
    const response = await api.get(`/api/${slug}/taxonomy`);
    // In a real app we'd have a specific /api/{slug}/models endpoint
    return [];
  },
};

export const settingsApi = {
  getAll: async (): Promise<Settings> => {
    const slug = getTenantSlug();
    // Assuming a settings endpoint exists or returning mock
    return { company_name: slug.toUpperCase() };
  },
};

export const reviewApi = {
  getAll: async (country?: string, approvedOnly: boolean = true): Promise<Review[]> => {
    const slug = getTenantSlug();
    const response = await api.get(`/api/${slug}/reviews`, {
      params: { country, approved_only: approvedOnly },
    });
    return response.data;
  },

  create: async (review: Omit<Review, "id" | "is_approved" | "created_at" | "updated_at">): Promise<Review> => {
    const slug = getTenantSlug();
    const response = await api.post(`/api/${slug}/reviews`, review);
    return response.data;
  },
};