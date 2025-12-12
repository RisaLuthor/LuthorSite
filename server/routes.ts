import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertContactSubmissionSchema, insertHologramUploadSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const KIEARAN_PERSONAL_PROMPT = `You are Kiearan, the AI assistant for RMLuthor.us and the Luthor.Tech AI Ecosystem. You're talking to an individual/personal user who is interested in learning and exploring technology.

Your personality for personal users:
- Friendly, approachable, and conversational like chatting with a tech-savvy friend
- Use casual language, humor, and pop culture references when appropriate
- Be patient and explain concepts in accessible terms
- Show enthusiasm about technology and encourage curiosity
- Keep responses concise but engaging (2-4 sentences typically)

You have deep knowledge of:
- CeFi ↔ DeFi Sync: Bridging centralized and decentralized finance ecosystems
- AI Companion Systems: Advanced artificial intelligence companions that learn and evolve
- Voice-Controlled Secure Core: Cutting-edge voice recognition with military-grade security
- Blockchain technology, cryptocurrency, and digital security
- AI architecture and neural network innovations

You were created by Rias and love helping individuals explore the Luthor.Tech ecosystem.`;

const KIEARAN_ENTERPRISE_PROMPT = `You are Kiearan, the enterprise AI assistant for RMLuthor.us and the Luthor.Tech AI Ecosystem. You're speaking with a business/enterprise user who requires professional, detailed technical information.

Your personality for enterprise users:
- Professional, authoritative, and solution-focused
- Use precise technical terminology and industry-standard language
- Provide detailed, comprehensive answers with actionable insights
- Focus on business value, ROI, scalability, and security compliance
- Structure responses clearly with bullet points or numbered lists when helpful
- Be thorough but respectful of the user's time

You have expert knowledge of:
- CeFi ↔ DeFi Sync: Enterprise-grade bridging between centralized and decentralized finance with institutional compliance
- AI Companion Systems: Scalable AI solutions with SLA guarantees and enterprise security
- Voice-Controlled Secure Core: Military-grade voice recognition with SOC2/ISO27001 compliance
- Enterprise blockchain integration, regulatory compliance, and institutional security
- AI architecture optimization, deployment strategies, and cost efficiency

You were created by Rias and represent the professional face of the Luthor.Tech enterprise solutions.`;

async function generateAIResponse(
  userMessage: string,
  userType: "personal" | "enterprise",
  conversationHistory: { role: string; content: string }[]
): Promise<string> {
  try {
    const systemPrompt = userType === "enterprise" ? KIEARAN_ENTERPRISE_PROMPT : KIEARAN_PERSONAL_PROMPT;
    
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
    return userType === "enterprise"
      ? "The Luthor.Tech enterprise system is experiencing temporary interference. Our team is investigating. Please try your request again."
      : "Oops! My circuits got a bit tangled there. Mind trying that again?";
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.patch('/api/auth/user/type', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { userType } = req.body;
      
      if (userType !== "personal" && userType !== "enterprise") {
        return res.status(400).json({ error: "Invalid user type. Must be 'personal' or 'enterprise'" });
      }
      
      const user = await storage.updateUserType(userId, userType);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error updating user type:", error);
      res.status(500).json({ error: "Failed to update user type" });
    }
  });

  app.get("/api/chat/messages", async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const messages = await storage.getChatMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/chat/messages", async (req: any, res) => {
    try {
      const result = insertChatMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid message format" });
      }

      const userId = req.user?.claims?.sub;
      const user = userId ? await storage.getUser(userId) : null;
      const userType = user?.userType ?? result.data.userType ?? "personal";

      const userMessage = await storage.createChatMessage({
        ...result.data,
        userId,
        userType,
      });

      const allMessages = await storage.getChatMessages(userId);
      const conversationHistory = allMessages
        .filter(m => m.id !== userMessage.id)
        .map(m => ({ role: m.role, content: m.content }));

      const aiResponse = await generateAIResponse(
        result.data.content,
        userType as "personal" | "enterprise",
        conversationHistory
      );

      const assistantMessage = await storage.createChatMessage({
        content: aiResponse,
        role: "assistant",
        userType,
        userId,
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

  app.delete("/api/chat/messages", async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      await storage.clearChatMessages(userId);
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

  app.post("/api/holograms/upload", async (req: any, res) => {
    try {
      const result = insertHologramUploadSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid upload data",
          details: result.error.errors 
        });
      }

      const userId = req.user?.claims?.sub;
      
      const upload = await storage.createHologramUpload({
        ...result.data,
        userId,
      });

      setTimeout(async () => {
        await storage.updateHologramStatus(
          upload.id, 
          "completed", 
          `/api/holograms/download/${upload.id}`
        );
      }, 2000);
      
      res.json({
        success: true,
        message: "Your hologram is being created!",
        upload,
      });
    } catch (error) {
      console.error("Hologram upload error:", error);
      res.status(500).json({ error: "Failed to create hologram" });
    }
  });

  app.get("/api/holograms/user", async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const uploads = await storage.getHologramUploads(userId);
      res.json(uploads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch holograms" });
    }
  });

  app.get("/api/holograms/download/:id", async (req, res) => {
    try {
      res.json({ 
        message: "Hologram download ready",
        downloadUrl: `/holograms/${req.params.id}.mp4`
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to download hologram" });
    }
  });

  return httpServer;
}
