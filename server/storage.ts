import { 
  users,
  chatMessages,
  contactSubmissions,
  type User, 
  type UpsertUser, 
  type ChatMessage, 
  type InsertChatMessage,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";
import { db } from "./db";
import { eq, isNull } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserType(id: string, userType: "personal" | "enterprise"): Promise<User | undefined>;
  getChatMessages(userId?: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  clearChatMessages(userId?: string): Promise<void>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserType(id: string, userType: "personal" | "enterprise"): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ userType, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getChatMessages(userId?: string): Promise<ChatMessage[]> {
    if (userId) {
      return await db.select().from(chatMessages).where(eq(chatMessages.userId, userId));
    }
    return await db.select().from(chatMessages).where(isNull(chatMessages.userId));
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db
      .insert(chatMessages)
      .values({
        id: randomUUID(),
        content: message.content,
        role: message.role as "user" | "assistant",
        userType: message.userType ?? "personal",
        userId: message.userId,
      })
      .returning();
    return newMessage;
  }

  async clearChatMessages(userId?: string): Promise<void> {
    if (userId) {
      await db.delete(chatMessages).where(eq(chatMessages.userId, userId));
    } else {
      await db.delete(chatMessages).where(isNull(chatMessages.userId));
    }
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values({
        id: randomUUID(),
        ...submission,
      })
      .returning();
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }
}

export const storage = new DatabaseStorage();
