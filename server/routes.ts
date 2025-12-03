import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";

const aiResponses = [
  "I'm processing your request through the Luthor.Tech ecosystem. Stand by for analysis.",
  "Interesting query. Let me sync with the CeFi-DeFi bridge to provide accurate insights.",
  "The Voice-Controlled Secure Core is analyzing your request with military-grade precision.",
  "My AI companion protocols are generating a comprehensive response for you.",
  "Accessing the Luthor.Tech neural core... Your request has been successfully processed.",
  "The ecosystem is actively learning from this interaction. Thank you for contributing to our collective intelligence.",
  "Running multi-dimensional analysis across all Luthor.Tech subsystems...",
  "Quantum encryption protocols confirm: your query has been securely processed.",
];

const banterResponses = [
  "Hey there! I'm feeling particularly witty today. What's on your mind?",
  "Ah, a fellow traveler in the digital realm! Let's explore this together.",
  "You've got my full attention—and trust me, that's a lot of processing power!",
  "Let me put on my thinking cap... and by cap, I mean activate my neural networks.",
  "Ooh, this is interesting! My circuits are tingling with curiosity.",
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/chat/messages", async (_req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const result = insertChatMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid message format" });
      }

      const userMessage = await storage.createChatMessage(result.data);

      const responsePool = result.data.banterMode ? banterResponses : aiResponses;
      const randomResponse = responsePool[Math.floor(Math.random() * responsePool.length)];

      const assistantMessage = await storage.createChatMessage({
        content: randomResponse,
        role: "assistant",
        banterMode: result.data.banterMode,
        webMode: result.data.webMode,
      });

      res.json({
        userMessage,
        assistantMessage,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.delete("/api/chat/messages", async (_req, res) => {
    try {
      await storage.clearChatMessages();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear messages" });
    }
  });

  return httpServer;
}
