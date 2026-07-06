// Database schema for CIA Store (D1 + Drizzle ORM)
// In production, install: drizzle-orm @cloudflare/workers-types
// and use drizzle-kit for migrations

/*
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
*/

// Type definitions for the database schema
export interface User {
  id: string
  email: string
  username: string
  passwordHash?: string
  role: 'customer' | 'admin' | 'superadmin'
  avatarUrl?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Session {
  id: string
  userId: string
  expiresAt: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  nameAr?: string
  slug: string
  description?: string
  descriptionAr?: string
  imageUrl?: string
  isActive: boolean
  sortOrder: number
  createdAt: string
}

export interface SubCategory {
  id: string
  categoryId: string
  name: string
  nameAr?: string
  slug: string
  createdAt: string
}

export interface Product {
  id: string
  categoryId: string
  subCategoryId?: string
  name: string
  nameAr?: string
  slug: string
  description?: string
  descriptionAr?: string
  price: number
  originalPrice?: number
  currency: string
  imageUrl?: string
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical'
  productType: 'item' | 'account' | 'gamepass' | 'robux' | 'service'
  inStock: boolean
  stockCount: number
  isActive: boolean
  features: string[]
  metadata?: any
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId?: string
  email: string
  username?: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded'
  totalAmount: number
  currency: string
  paymentMethod?: 'stripe' | 'paypal' | 'usdt' | 'manual'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  stripePaymentIntentId?: string
  paypalOrderId?: string
  usdtTxHash?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  quantity: number
  price: number
  createdAt: string
}

export interface Review {
  id: string
  userId?: string
  productId?: string
  rating: number
  comment?: string
  userName: string
  avatarUrl?: string
  isApproved: boolean
  createdAt: string
}

export interface Cart {
  id: string
  userId?: string
  sessionId?: string
  items: string
  createdAt: string
  updatedAt: string
}
