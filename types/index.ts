// types/index.ts

// ============================================
// Enums from Prisma Schema
// ============================================

export type UserRole =
  | 'ADMIN'
  | 'MANAGER'
  | 'USER'
  | 'DEALER'
  | 'SUPPLIER'
  | 'BUYER'
  | 'VIEWER';

export type UserStatus = 'ACTIVE' | 'INACTIVE';

export type VehicleStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'SHIPPED';

export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID';

export type CartStatus = 'ACTIVE' | 'EXPIRED' | 'CONVERTED_TO_BOOKING';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'CONVERTED_TO_SALE';

export type InquiryType =
  | 'GENERAL'
  | 'VEHICLE_INQUIRY'
  | 'DEALER_CONTACT'
  | 'SUPPORT';

export type InquiryStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export type DocumentType =
  | 'TITLE'
  | 'INSPECTION'
  | 'EXPORT_CERT'
  | 'CUSTOMS'
  | 'AUCTION_SHEET'
  | 'SERVICE_RECORD'
  | 'OTHER';

// ============================================
// Database Model Interfaces
// ============================================

export interface Site {
  id: number;
  domain: string;
  name: string;
  themeConfig?: any;
  contactInfo?: any;
  defaultCurrency?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  country: string | null;
  department: string | null;
  role: UserRole;
  status: UserStatus;
  image: string | null;
  siteId: number | null;
  companyId: number | null;
  createdAt: string;
  updatedAt: string;
  dealerProfile?: DealerProfile | null;
}

export interface Vehicle {
  id: number;
  siteId: number;
  stockNumber: string;
  vinChassis: string | null;
  make: string;
  model: string;
  yearManufacture: number;
  yearRegistration: number | null;
  priceFob: number; // Decimal in DB
  priceRetail: number | null; // Decimal in DB
  currency: string | null;
  description: string | null;
  status: VehicleStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  // Relationships
  images?: VehicleImage[];
  specs?: VehicleSpec | null;
  logistics?: VehicleLogistics | null;
  site?: Site;
}

export interface VehicleSpec {
  id: number;
  vehicleId: number;
  engineCode: string | null;
  engineCc: number | null;
  fuelType: string | null;
  transmission: string | null;
  driveType: string | null;
  steering: string | null;
  seats: number | null;
  doors: number | null;
  colorExterior: string | null;
  colorInterior: string | null;
  trimGrade: string | null;
  mileageKm: number | null;
  vehicleType: string | null;
  powerKw: number | null;
  powerHp: number | null;
  torqueNm: number | null;
  weightKg: number | null;
  dimensions: string | null;
  fuelConsumption: string | null;
  emissionStandard: string | null;
  options: any;
}

export interface VehicleLogistics {
  id: number;
  vehicleId: number;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
  m3: number | null; // Decimal in DB
  weightKg: number | null;
  currentPortId: string | null;
  currentPortName: string | null;
  originCountry: string | null;
  originPort: string | null;
  hsCode: string | null;
  exportCertStatus: boolean;
  inspectionStatus: string | null;
  inspectionDate: string | null;
  importDate: string | null;
  shippingStatus: string | null;
  etaDestination: string | null;
}

export interface VehicleImage {
  id: number;
  vehicleId: number;
  url: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: string;
}

export interface DealerProfile {
  id: number;
  userId: number;
  businessName: string | null;
  description: string | null;
  logo: string | null;
  coverImage: string | null;
  rating: number | null; // Decimal in DB
  totalSales: number;
  yearsInBusiness: number | null;
  address: string | null;
  website: string | null;
  publicEmail: string | null;
  publicPhone: string | null;
}

// ============================================
// UI & Component Types (Mapped from DB Models)
// ============================================

export interface CartItem {
  carId: string;
  addedAt: string;
}

export interface ComparisonItem {
  carId: string;
  addedAt: string;
}

/**
 * Car is the primary interface used in frontend components (CarCard, Inventory, etc.)
 * It acts as a UI-friendly representation of the Vehicle model.
 */
export interface Car {
  id: string; // Kept as string for UI compatibility if needed, but usually vehicle.id.toString()
  stockNumber: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  engine: string;
  transmission: string;
  fuel: string;
  color: string;
  location: string;
  images: string[];
  features: string[];
  condition: string;
  status: 'Available' | 'Sold' | 'Reserved';
  rating: number;
  reviews: number;
  badge?: string;
  description?: string;
  dealer: Dealer;
  specs: CarSpec[];
}

export interface CarSpec {
  label: string;
  value: string;
  icon?: string;
}

export interface Dealer {
  id: string;
  name: string;
  location: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
  image: string;
  specialty: string[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
}

export interface CarMake {
  id: string;
  name: string;
  logo: string;
  country: string;
  popular: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar: string;
  carBought: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

export interface FilterState {
  make: string[];
  model: string[];
  year: [number, number];
  price: [number, number];
  transmission: string[];
  fuel: string[];
  condition: string[];
  location: string[];
  sortBy:
    | 'latest'
    | 'price-low'
    | 'price-high'
    | 'year-newest'
    | 'year-oldest'
    | 'mileage-low'
    | 'mileage-high';
}
