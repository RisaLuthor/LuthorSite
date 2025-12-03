import { type User, type InsertUser, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getChatMessages(): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  clearChatMessages(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    
    const initialMessage: ChatMessage = {
      id: randomUUID(),
      content: "Hi—I'm Kiearan. Toggle Web for broader answers, uncheck Banter for strictly professional tone, or just type your question.",
      role: "assistant",
      banterMode: true,
      webMode: true,
    };
    this.chatMessages.set(initialMessage.id, initialMessage);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { 
      ...insertMessage, 
      id,
      banterMode: insertMessage.banterMode ?? false,
      webMode: insertMessage.webMode ?? true,
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async clearChatMessages(): Promise<void> {
    this.chatMessages.clear();
    const initialMessage: ChatMessage = {
      id: randomUUID(),
      content: "Hi—I'm Kiearan. Toggle Web for broader answers, uncheck Banter for strictly professional tone, or just type your question.",
      role: "assistant",
      banterMode: true,
      webMode: true,
    };
    this.chatMessages.set(initialMessage.id, initialMessage);
  }
}

export const storage = new MemStorage();
