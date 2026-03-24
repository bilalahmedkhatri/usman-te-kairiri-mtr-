export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  engine: string;
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuel: 'Gasoline' | 'Hybrid' | 'Electric' | 'Diesel';
  color: string;
  location: string;
  images: string[];
  features: string[];
  condition: 'New' | 'Used' | 'Certified Pre-Owned';
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

export type UserRole =
  | 'ADMIN'
  | 'MANAGER'
  | 'USER'
  | 'DEALER'
  | 'SUPPLIER'
  | 'BUYER'
  | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  wishlist: string[];
  inquiries: Inquiry[];
  createdAt: string;
}

export interface Inquiry {
  id: string;
  carId: string;
  userId: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  response?: string;
}

export interface CartItem {
  carId: string;
  addedAt: string;
}

export interface ComparisonItem {
  carId: string;
  addedAt: string;
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
  sortBy: 'latest' | 'price-low' | 'price-high' | 'year-newest' | 'year-oldest' | 'mileage-low' | 'mileage-high';
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
