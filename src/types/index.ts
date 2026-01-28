// Factory Types
export interface Factory {
  id: string;
  name: string;
  nameEn: string;
  logo?: string;
  coverImage?: string;
  description: string;
  location: string;
  city: string;
  country: string;
  category: string;
  subcategory: string;
  establishedYear: number;
  employeesCount: string;
  productionCapacity: string;
  certifications: string[];
  verificationStatus: 'verified' | 'pending' | 'rejected';
  verificationScore: number;
  isDirectFactory: boolean;
  rating: number;
  reviewsCount: number;
  responseRate: number;
  responseTime: string;
  minOrderValue: number;
  mainProducts: string[];
  exportCountries: string[];
  createdAt: string;
  updatedAt: string;
}

// Product Types
export interface Product {
  id: string;
  factoryId: string;
  name: string;
  nameEn: string;
  description: string;
  images: string[];
  category: string;
  subcategory: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  currency: string;
  minOrderQuantity: number;
  unit: string;
  specifications: Record<string, string>;
  customizable: boolean;
  leadTime: string;
  sampleAvailable: boolean;
  samplePrice?: number;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  companyName?: string;
  phone?: string;
  country: string;
  city?: string;
  avatar?: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  subscriptionPlan: 'free' | 'basic' | 'premium';
  subscriptionEndDate?: string;
  createdAt: string;
}

// Order Types
export interface ImportOrder {
  id: string;
  userId: string;
  factoryId?: string;
  productId?: string;
  status: 'pending' | 'quoted' | 'confirmed' | 'production' | 'shipping' | 'delivered' | 'cancelled';
  productName: string;
  productDescription: string;
  quantity: number;
  estimatedPrice?: number;
  finalPrice?: number;
  currency: string;
  shippingMethod?: string;
  shippingCost?: number;
  inspectionRequired: boolean;
  documents: OrderDocument[];
  timeline: OrderTimeline[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderDocument {
  id: string;
  orderId: string;
  type: 'invoice' | 'packing_list' | 'bill_of_lading' | 'certificate_of_origin' | 'bank_transfer' | 'inspection_report' | 'other';
  name: string;
  url: string;
  uploadedBy: 'user' | 'factory' | 'platform';
  uploadedAt: string;
}

export interface OrderTimeline {
  id: string;
  orderId: string;
  status: string;
  description: string;
  date: string;
}

// Service Request Types
export interface ServiceRequest {
  id: string;
  userId: string;
  type: 'inspection' | 'shipping_quote' | 'quality_check' | 'money_transfer' | 'custom';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  details: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'user' | 'factory' | 'ai' | 'support';
  content: string;
  attachments?: string[];
  createdAt: string;
  readAt?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  type: 'factory_chat' | 'support' | 'ai_assistant';
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

// Subscription Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  maxOrders: number;
  maxFactoryContacts: number;
  aiSearches: number;
  priority: boolean;
}

// Search Types
export interface SearchFilters {
  query: string;
  category?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  minOrderQuantity?: number;
  verified?: boolean;
  sortBy?: 'relevance' | 'price' | 'rating' | 'newest';
}

// Shipping Types
export interface ShippingQuote {
  id: string;
  origin: string;
  destination: string;
  weight: number;
  volume: number;
  method: 'sea' | 'air' | 'express' | 'rail';
  estimatedDays: number;
  price: number;
  currency: string;
  validUntil: string;
}
