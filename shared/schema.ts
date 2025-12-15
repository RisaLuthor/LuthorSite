import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, jsonb, index, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  userType: varchar("user_type").$type<"personal" | "enterprise">().default("personal"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  role: text("role").notNull().$type<"user" | "assistant">(),
  userType: varchar("user_type").$type<"personal" | "enterprise">().default("personal"),
  userId: varchar("user_id"),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  content: true,
  role: true,
  userType: true,
  userId: true,
}).extend({
  content: z.string().min(1, "Message cannot be empty").max(2000, "Message too long"),
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const hologramUploads = pgTable("hologram_uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  imageUrl: text("image_url"),
  customMessage: text("custom_message"),
  voiceUrl: text("voice_url"),
  color: varchar("color").default("Cyan"),
  style: varchar("style").default("Spinning"),
  status: varchar("status").$type<"pending" | "processing" | "completed" | "failed">().default("pending"),
  downloadUrl: text("download_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHologramUploadSchema = createInsertSchema(hologramUploads).pick({
  userId: true,
  imageUrl: true,
  customMessage: true,
  voiceUrl: true,
  color: true,
  style: true,
}).extend({
  customMessage: z.string().max(100, "Message must be 100 characters or less").optional(),
});

export type InsertHologramUpload = z.infer<typeof insertHologramUploadSchema>;
export type HologramUpload = typeof hologramUploads.$inferSelect;

// Kieran AI Personalization - Profiles
export const kieranProfiles = pgTable("kieran_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  email: varchar("email").unique().notNull(),
  userType: varchar("user_type").$type<"personal" | "enterprise">().default("personal"),
  isCreator: boolean("is_creator").default(false),
  toneSettings: jsonb("tone_settings").$type<{
    formality: number;
    empathy: number;
    directness: number;
  }>().default({ formality: 50, empathy: 50, directness: 50 }),
  knowledgeFocus: text("knowledge_focus").array(),
  interactionStyle: varchar("interaction_style").default("balanced"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertKieranProfileSchema = createInsertSchema(kieranProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertKieranProfile = z.infer<typeof insertKieranProfileSchema>;
export type KieranProfile = typeof kieranProfiles.$inferSelect;

// Kieran AI Personalization - Memories
export const kieranMemories = pgTable("kieran_memories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").notNull(),
  memoryType: varchar("memory_type").$type<"preference" | "interaction" | "milestone">().default("interaction"),
  content: text("content").notNull(),
  importance: integer("importance").default(5),
  sourceMessageIds: text("source_message_ids").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertKieranMemorySchema = createInsertSchema(kieranMemories).omit({
  id: true,
  createdAt: true,
});

export type InsertKieranMemory = z.infer<typeof insertKieranMemorySchema>;
export type KieranMemory = typeof kieranMemories.$inferSelect;
