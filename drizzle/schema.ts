import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "factory", "buyer"]).default("buyer").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Blog posts table for storing articles and content
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  authorId: int("authorId").notNull().references(() => users.id),
  category: varchar("category", { length: 100 }),
  tags: text("tags"),
  featured: int("featured").default(0),
  published: int("published").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Chat messages table for storing AI chat history
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Factories table for storing factory information
 */
export const factories = mysqlTable("factories", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location"),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 20 }),
  certifications: text("certifications"), // JSON array stored as text
  productCategories: text("productCategories"), // JSON array
  productionCapacity: text("productionCapacity"),
  minimumOrderQuantity: int("minimumOrderQuantity"),
  logoUrl: text("logoUrl"),
  bannerUrl: text("bannerUrl"),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "rejected"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Factory = typeof factories.$inferSelect;
export type InsertFactory = typeof factories.$inferInsert;

/**
 * Products table for storing factory products
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  factoryId: int("factoryId").notNull().references(() => factories.id),
  name: text("name").notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array
  specifications: text("specifications"), // JSON object
  basePrice: int("basePrice").notNull(), // Price in cents
  pricingTiers: text("pricingTiers"), // JSON array for bulk pricing
  minimumOrderQuantity: int("minimumOrderQuantity").default(1),
  imageUrls: text("imageUrls"), // JSON array
  featured: int("featured").default(0),
  active: int("active").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Inquiries table for buyer-factory inquiries
 */
export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  buyerId: int("buyerId").notNull().references(() => users.id),
  factoryId: int("factoryId").notNull().references(() => factories.id),
  productId: int("productId").references(() => products.id),
  subject: text("subject").notNull(),
  description: text("description"),
  specifications: text("specifications"), // JSON object
  quantityRequired: int("quantityRequired"),
  status: mysqlEnum("status", ["pending", "responded", "negotiating", "completed", "cancelled"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

/**
 * Messages table for buyer-factory messaging
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  inquiryId: int("inquiryId").notNull().references(() => inquiries.id),
  senderId: int("senderId").notNull().references(() => users.id),
  receiverId: int("receiverId").notNull().references(() => users.id),
  content: text("content").notNull(),
  attachments: text("attachments"), // JSON array of file URLs
  read: int("read").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Forum posts table for Q&A
 */
export const forumPosts = mysqlTable("forum_posts", {
  id: int("id").autoincrement().primaryKey(),
  authorId: int("authorId").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array
  views: int("views").default(0),
  status: mysqlEnum("status", ["open", "answered", "closed"]).default("open"),
  bestAnswerId: int("bestAnswerId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = typeof forumPosts.$inferInsert;

/**
 * Forum answers table
 */
export const forumAnswers = mysqlTable("forum_answers", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull().references(() => forumPosts.id),
  authorId: int("authorId").notNull().references(() => users.id),
  content: text("content").notNull(),
  votes: int("votes").default(0),
  isBestAnswer: int("isBestAnswer").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumAnswer = typeof forumAnswers.$inferSelect;
export type InsertForumAnswer = typeof forumAnswers.$inferInsert;

/**
 * Forum votes table for answer voting
 */
export const forumVotes = mysqlTable("forum_votes", {
  id: int("id").autoincrement().primaryKey(),
  answerId: int("answerId").notNull().references(() => forumAnswers.id),
  userId: int("userId").notNull().references(() => users.id),
  voteType: mysqlEnum("voteType", ["upvote", "downvote"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ForumVote = typeof forumVotes.$inferSelect;
export type InsertForumVote = typeof forumVotes.$inferInsert;

/**
 * Orders table for marketplace purchases
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  buyerId: int("buyerId").notNull().references(() => users.id),
  factoryId: int("factoryId").notNull().references(() => factories.id),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  items: text("items").notNull(), // JSON array of order items
  totalAmount: int("totalAmount").notNull(), // Amount in cents
  status: mysqlEnum("status", ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]).default("pending"),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "completed", "failed", "refunded"]).default("pending"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  shippingAddress: text("shippingAddress"), // JSON object
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Notifications table for email and in-app notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  type: varchar("type", { length: 50 }).notNull(), // order_placed, order_shipped, inquiry_received, answer_posted, etc.
  title: text("title").notNull(),
  message: text("message"),
  relatedEntityId: int("relatedEntityId"), // ID of related order, inquiry, post, etc.
  read: int("read").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
