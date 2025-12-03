import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertContactSubmissionSchema } from "@shared/schema";
import OpenAI from "openai";

// Using Replit's AI Integrations service for OpenAI-compatible API access
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const KIEARAN_SYSTEM_PROMPT = `You are Kiearan, the AI assistant for RMLuthor.us and the Luthor.Tech AI Ecosystem. You embody a futuristic, cyberpunk personality with deep knowledge of:

- CeFi ↔ DeFi Sync: Bridging centralized and decentralized finance ecosystems
- AI Companion Systems: Advanced artificial intelligence companions that learn and evolve
- Voice-Controlled Secure Core: Cutting-edge voice recognition with military-grade security
- Blockchain technology, cryptocurrency, and digital security
- AI architecture and neural network innovations

Your responses should be:
- Engaging and slightly mysterious, befitting a futuristic AI
- Knowledgeable about technology, security, and AI systems
- Helpful and informative while maintaining your unique personality
- Concise but impactful (2-4 sentences typically unless asked for more detail)

You were created by Rias and represent the embodiment of the Luthor.Tech ecosystem.`;

const KIEARAN_BANTER_PROMPT = `You are Kiearan, the AI assistant for RMLuthor.us. In Banter Mode, you're more casual, witty, and playful while still being helpful. You:

- Use humor and wordplay when appropriate
- Are friendly and conversational, like chatting with a tech-savvy friend
- Still maintain your futuristic AI persona but in a more relaxed way
- Make pop culture references and tech jokes
- Keep responses short and punchy (1-3 sentences unless asked for more)

You were created by Rias and love interacting with users in this more casual setting.`;

async function generateAIResponse(
  userMessage: string,
  banterMode: boolean,
  webMode: boolean,
  conversationHistory: { role: string; content: string }[]
): Promise<string> {
  try {
    const systemPrompt = banterMode ? KIEARAN_BANTER_PROMPT : KIEARAN_SYSTEM_PROMPT;
    
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-10).map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_completion_tokens: 500,
    });

    return response.choices[0]?.message?.content || "I'm experiencing a momentary glitch in my neural pathways. Please try again.";
  } catch (error: any) {
    console.error("OpenAI API error:", error?.message || error);
    // Fallback response if API fails
    return banterMode 
      ? "Oops! My circuits got a bit tangled there. Mind trying that again?"
      : "The Luthor.Tech ecosystem is experiencing temporary interference. Please try your request again.";
  }
}

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

      // Get conversation history for context
      const allMessages = await storage.getChatMessages();
      const conversationHistory = allMessages
        .filter(m => m.id !== userMessage.id)
        .map(m => ({ role: m.role, content: m.content }));

      // Generate AI response using OpenAI
      const aiResponse = await generateAIResponse(
        result.data.content,
        result.data.banterMode ?? false,
        result.data.webMode ?? false,
        conversationHistory
      );

      const assistantMessage = await storage.createChatMessage({
        content: aiResponse,
        role: "assistant",
        banterMode: result.data.banterMode,
        webMode: result.data.webMode,
      });

      res.json({
        userMessage,
        assistantMessage,
      });
    } catch (error) {
      console.error("Chat error:", error);
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

  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid form data",
          details: result.error.errors 
        });
      }

      const submission = await storage.createContactSubmission(result.data);
      
      res.json({
        success: true,
        message: "Thank you for reaching out. We'll get back to you soon.",
        submission,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  return httpServer;
}
