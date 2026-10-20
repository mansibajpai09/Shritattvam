import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

// Users table (synced with Auth)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').default('customer').notNull(), // 'admin' | 'customer'
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Products and Inventory table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  price: integer('price').notNull(), // in Rupees
  originalPrice: integer('original_price'),
  discount: integer('discount').default(0),
  image: text('image').notNull(),
  category: text('category').notNull(),
  rating: text('rating').default('4.8'),
  reviews: integer('reviews').default(0),
  stock: integer('stock').default(25).notNull(),
  inStock: boolean('in_stock').default(true).notNull(),
  features: jsonb('features').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone'),
  shippingAddress: text('shipping_address').notNull(),
  items: jsonb('items').$type<{
    productId: number
    name: string
    price: number
    quantity: number
    image?: string
  }[]>().notNull(),
  totalAmount: integer('total_amount').notNull(),
  paymentStatus: text('payment_status').default('Pending').notNull(), // 'Pending' | 'Paid' | 'Failed'
  deliveryStatus: text('delivery_status').default('Order Placed').notNull(), // 'Order Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const usersRelations = relations(users, () => ({}))
