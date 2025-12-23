import { 
  users,
  chatMessages,
  contactSubmissions,
  hologramUploads,
  kieranProfiles,
  kieranMemories,
  workUpdates,
  blogComments,
  printingProjects,
  workUpdateReactions,
  type User, 
  type UpsertUser, 
  type ChatMessage, 
  type InsertChatMessage,
  type ContactSubmission,
  type InsertContactSubmission,
  type HologramUpload,
  type InsertHologramUpload,
  type KieranProfile,
  type InsertKieranProfile,
  type KieranMemory,
  type InsertKieranMemory,
  type WorkUpdate,
  type InsertWorkUpdate,
  type BlogComment,
  type InsertBlogComment,
  type PrintingProject,
  type InsertPrintingProject,
  type WorkUpdateReaction,
  type InsertWorkUpdateReaction
} from "@shared/schema";
import { db } from "./db";
import { eq, isNull, desc, and, sql } from "drizzle-orm";
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
  createHologramUpload(upload: InsertHologramUpload): Promise<HologramUpload>;
  getHologramUploads(userId?: string): Promise<HologramUpload[]>;
  updateHologramStatus(id: string, status: "pending" | "processing" | "completed" | "failed", downloadUrl?: string): Promise<HologramUpload | undefined>;
  getOrCreateKieranProfile(email: string, userType: "personal" | "enterprise", userId?: string): Promise<KieranProfile>;
  updateKieranProfile(profileId: string, updates: Partial<InsertKieranProfile>): Promise<KieranProfile | undefined>;
  addKieranMemory(memory: InsertKieranMemory): Promise<KieranMemory>;
  getKieranMemories(profileId: string, limit?: number): Promise<KieranMemory[]>;
  updateMemoryImportance(memoryId: string, importance: number): Promise<KieranMemory | undefined>;
  // Work Updates
  getWorkUpdates(): Promise<WorkUpdate[]>;
  createWorkUpdate(update: InsertWorkUpdate): Promise<WorkUpdate>;
  deleteWorkUpdate(id: string): Promise<void>;
  // Blog Comments
  getBlogComments(workUpdateId?: string): Promise<BlogComment[]>;
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
  // Printing Projects
  getPrintingProjects(): Promise<PrintingProject[]>;
  createPrintingProject(project: InsertPrintingProject): Promise<PrintingProject>;
  deletePrintingProject(id: string): Promise<void>;
  // Work Update Reactions
  getReactionsForUpdate(workUpdateId: string): Promise<{ like: number; love: number; dislike: number }>;
  getUserReaction(workUpdateId: string, visitorId: string): Promise<WorkUpdateReaction | undefined>;
  toggleReaction(workUpdateId: string, visitorId: string, reactionType: "like" | "love" | "dislike"): Promise<void>;
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

  async createHologramUpload(upload: InsertHologramUpload): Promise<HologramUpload> {
    const [newUpload] = await db
      .insert(hologramUploads)
      .values({
        id: randomUUID(),
        ...upload,
      })
      .returning();
    return newUpload;
  }

  async getHologramUploads(userId?: string): Promise<HologramUpload[]> {
    if (userId) {
      return await db.select().from(hologramUploads).where(eq(hologramUploads.userId, userId));
    }
    return await db.select().from(hologramUploads);
  }

  async updateHologramStatus(
    id: string, 
    status: "pending" | "processing" | "completed" | "failed", 
    downloadUrl?: string
  ): Promise<HologramUpload | undefined> {
    const [updated] = await db
      .update(hologramUploads)
      .set({ status, downloadUrl })
      .where(eq(hologramUploads.id, id))
      .returning();
    return updated;
  }

  async getOrCreateKieranProfile(
    email: string, 
    userType: "personal" | "enterprise",
    userId?: string
  ): Promise<KieranProfile> {
    const [existing] = await db
      .select()
      .from(kieranProfiles)
      .where(eq(kieranProfiles.email, email));
    
    if (existing) {
      return existing;
    }

    const isCreator = email.toLowerCase() === "risaluthor@rmluthor.us";
    
    const [profile] = await db
      .insert(kieranProfiles)
      .values({
        id: randomUUID(),
        email,
        userId,
        userType,
        isCreator,
        toneSettings: userType === "enterprise" 
          ? { formality: 80, empathy: 40, directness: 80 }
          : { formality: 30, empathy: 70, directness: 50 },
        interactionStyle: userType === "enterprise" ? "professional" : "friendly",
      })
      .onConflictDoNothing({ target: kieranProfiles.email })
      .returning();
    
    if (profile) {
      return profile;
    }
    
    const [existingAfterConflict] = await db
      .select()
      .from(kieranProfiles)
      .where(eq(kieranProfiles.email, email));
    
    return existingAfterConflict;
  }

  async updateKieranProfile(
    profileId: string, 
    updates: Partial<InsertKieranProfile>
  ): Promise<KieranProfile | undefined> {
    const { email, userId, userType, isCreator, toneSettings, knowledgeFocus, interactionStyle } = updates;
    const setValues: Record<string, unknown> = { updatedAt: new Date() };
    if (email !== undefined) setValues.email = email;
    if (userId !== undefined) setValues.userId = userId;
    if (userType !== undefined) setValues.userType = userType;
    if (isCreator !== undefined) setValues.isCreator = isCreator;
    if (toneSettings !== undefined) setValues.toneSettings = toneSettings;
    if (knowledgeFocus !== undefined) setValues.knowledgeFocus = knowledgeFocus;
    if (interactionStyle !== undefined) setValues.interactionStyle = interactionStyle;
    
    const [updated] = await db
      .update(kieranProfiles)
      .set(setValues)
      .where(eq(kieranProfiles.id, profileId))
      .returning();
    return updated;
  }

  async addKieranMemory(memory: InsertKieranMemory): Promise<KieranMemory> {
    const [newMemory] = await db
      .insert(kieranMemories)
      .values({
        id: randomUUID(),
        profileId: memory.profileId,
        memoryType: memory.memoryType,
        content: memory.content,
        importance: memory.importance,
        sourceMessageIds: memory.sourceMessageIds,
      })
      .returning();
    return newMemory;
  }

  async getKieranMemories(profileId: string, limit: number = 20): Promise<KieranMemory[]> {
    return await db
      .select()
      .from(kieranMemories)
      .where(eq(kieranMemories.profileId, profileId))
      .orderBy(desc(kieranMemories.importance), desc(kieranMemories.createdAt))
      .limit(limit);
  }

  async updateMemoryImportance(memoryId: string, importance: number): Promise<KieranMemory | undefined> {
    const [updated] = await db
      .update(kieranMemories)
      .set({ importance })
      .where(eq(kieranMemories.id, memoryId))
      .returning();
    return updated;
  }

  // Work Updates
  async getWorkUpdates(): Promise<WorkUpdate[]> {
    return await db.select().from(workUpdates).orderBy(desc(workUpdates.createdAt));
  }

  async createWorkUpdate(update: InsertWorkUpdate): Promise<WorkUpdate> {
    const [newUpdate] = await db
      .insert(workUpdates)
      .values({
        id: randomUUID(),
        ...update,
      })
      .returning();
    return newUpdate;
  }

  async deleteWorkUpdate(id: string): Promise<void> {
    await db.delete(workUpdateReactions).where(eq(workUpdateReactions.workUpdateId, id));
    await db.delete(blogComments).where(eq(blogComments.workUpdateId, id));
    await db.delete(workUpdates).where(eq(workUpdates.id, id));
  }

  // Blog Comments
  async getBlogComments(workUpdateId?: string): Promise<BlogComment[]> {
    if (workUpdateId) {
      return await db.select().from(blogComments).where(eq(blogComments.workUpdateId, workUpdateId)).orderBy(desc(blogComments.createdAt));
    }
    return await db.select().from(blogComments).orderBy(desc(blogComments.createdAt));
  }

  async createBlogComment(comment: InsertBlogComment): Promise<BlogComment> {
    const [newComment] = await db
      .insert(blogComments)
      .values({
        id: randomUUID(),
        ...comment,
      })
      .returning();
    return newComment;
  }

  // Printing Projects
  async getPrintingProjects(): Promise<PrintingProject[]> {
    return await db.select().from(printingProjects).orderBy(desc(printingProjects.createdAt));
  }

  async createPrintingProject(project: InsertPrintingProject): Promise<PrintingProject> {
    const [newProject] = await db
      .insert(printingProjects)
      .values({
        id: randomUUID(),
        ...project,
      })
      .returning();
    return newProject;
  }

  async deletePrintingProject(id: string): Promise<void> {
    await db.delete(printingProjects).where(eq(printingProjects.id, id));
  }

  // Work Update Reactions
  async getReactionsForUpdate(workUpdateId: string): Promise<{ like: number; love: number; dislike: number }> {
    const reactions = await db
      .select({
        reactionType: workUpdateReactions.reactionType,
        count: sql<number>`count(*)::int`,
      })
      .from(workUpdateReactions)
      .where(eq(workUpdateReactions.workUpdateId, workUpdateId))
      .groupBy(workUpdateReactions.reactionType);

    const counts = { like: 0, love: 0, dislike: 0 };
    reactions.forEach((r) => {
      if (r.reactionType === "like") counts.like = r.count;
      else if (r.reactionType === "love") counts.love = r.count;
      else if (r.reactionType === "dislike") counts.dislike = r.count;
    });
    return counts;
  }

  async getUserReaction(workUpdateId: string, visitorId: string): Promise<WorkUpdateReaction | undefined> {
    const [reaction] = await db
      .select()
      .from(workUpdateReactions)
      .where(
        and(
          eq(workUpdateReactions.workUpdateId, workUpdateId),
          eq(workUpdateReactions.visitorId, visitorId)
        )
      );
    return reaction;
  }

  async toggleReaction(workUpdateId: string, visitorId: string, reactionType: "like" | "love" | "dislike"): Promise<void> {
    const existing = await this.getUserReaction(workUpdateId, visitorId);
    
    if (existing) {
      if (existing.reactionType === reactionType) {
        await db
          .delete(workUpdateReactions)
          .where(eq(workUpdateReactions.id, existing.id));
      } else {
        await db
          .update(workUpdateReactions)
          .set({ reactionType })
          .where(eq(workUpdateReactions.id, existing.id));
      }
    } else {
      await db
        .insert(workUpdateReactions)
        .values({
          id: randomUUID(),
          workUpdateId,
          visitorId,
          reactionType,
        });
    }
  }
}

export const storage = new DatabaseStorage();
