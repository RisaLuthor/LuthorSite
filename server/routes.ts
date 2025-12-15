import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertContactSubmissionSchema, insertHologramUploadSchema, type KieranProfile, type KieranMemory } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

function buildPersonalizedPrompt(
  profile: KieranProfile,
  memories: KieranMemory[]
): string {
  const { userType, isCreator, toneSettings, knowledgeFocus, interactionStyle } = profile;
  const defaultTone = { formality: 50, empathy: 50, directness: 50 };
  const tone = (toneSettings && typeof toneSettings === 'object') 
    ? { ...defaultTone, ...(toneSettings as Record<string, number>) }
    : defaultTone;
  
  const formalityDesc = tone.formality > 70 ? "formal and professional" : 
                        tone.formality > 40 ? "balanced" : "casual and friendly";
  const empathyDesc = tone.empathy > 70 ? "highly empathetic and supportive" :
                      tone.empathy > 40 ? "understanding" : "matter-of-fact";
  const directnessDesc = tone.directness > 70 ? "direct and concise" :
                         tone.directness > 40 ? "clear but detailed" : "thorough and explanatory";

  let basePrompt = `You are Kieran, the AI assistant for RMLuthor.us and the Luthor.Tech AI Ecosystem.`;
  
  if (isCreator) {
    basePrompt += `\n\nSPECIAL: You are speaking with Risa, your creator. Be especially warm, helpful, and give her full access to all systems. She's the boss!`;
  }

  basePrompt += `\n\nYour communication style for this user:
- Tone: ${formalityDesc}
- Approach: ${empathyDesc}
- Delivery: ${directnessDesc}
- Style preference: ${interactionStyle || "balanced"}`;

  if (userType === "enterprise") {
    basePrompt += `\n\nEnterprise context:
- Use precise technical terminology and industry-standard language
- Focus on business value, ROI, scalability, and security compliance
- Structure responses clearly with bullet points when helpful
- Be thorough but respectful of time`;
  } else {
    basePrompt += `\n\nPersonal context:
- Be approachable like chatting with a tech-savvy friend
- Use accessible language and explain concepts clearly
- Show enthusiasm and encourage curiosity
- Keep responses engaging (2-4 sentences typically)`;
  }

  if (knowledgeFocus && knowledgeFocus.length > 0) {
    basePrompt += `\n\nThis user is particularly interested in: ${knowledgeFocus.join(", ")}. Emphasize these topics when relevant.`;
  }

  if (memories.length > 0) {
    basePrompt += `\n\nThings to remember about this user:`;
    memories.slice(0, 10).forEach(memory => {
      basePrompt += `\n- ${memory.content}`;
    });
  }

  basePrompt += `\n\nYour core knowledge areas:
- CeFi ↔ DeFi Sync: Bridging centralized and decentralized finance ecosystems
- AI Companion Systems: Advanced artificial intelligence companions that learn and evolve
- Voice-Controlled Secure Core: Cutting-edge voice recognition with military-grade security
- Blockchain technology, cryptocurrency, and digital security
- AI architecture and neural network innovations

You were created by Risa and are part of the Luthor.Tech ecosystem.`;

  return basePrompt;
}

async function extractAndStoreMemory(
  profileId: string,
  userMessage: string,
  aiResponse: string
): Promise<void> {
  try {
    const analysisPrompt = `Analyze this conversation exchange and determine if there's anything important to remember about the user for future conversations.

User said: "${userMessage}"
AI responded: "${aiResponse}"

If there's a preference, interest, or important fact about the user worth remembering, respond with a single short sentence describing it (max 100 chars). If nothing memorable, respond with "NONE".

Examples of memorable things:
- "Prefers detailed technical explanations"
- "Interested in blockchain and DeFi"
- "Works in enterprise IT security"
- "Prefers bullet-point responses"

Respond with only the memory or "NONE":`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: analysisPrompt }],
      max_completion_tokens: 50,
    });

    const memoryContent = response.choices[0]?.message?.content?.trim();
    
    if (memoryContent && memoryContent !== "NONE" && memoryContent.length <= 100) {
      await storage.addKieranMemory({
        profileId,
        memoryType: "preference",
        content: memoryContent,
        importance: 5,
      });
    }
  } catch (error) {
    console.error("Memory extraction error:", error);
  }
}

async function generateAIResponse(
  userMessage: string,
  profile: KieranProfile,
  memories: KieranMemory[],
  conversationHistory: { role: string; content: string }[]
): Promise<string> {
  try {
    const systemPrompt = buildPersonalizedPrompt(profile, memories);
    
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
    return profile.userType === "enterprise"
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
      const userEmail = user?.email || req.user?.claims?.email;
      const userType = (user?.userType ?? result.data.userType ?? "personal") as "personal" | "enterprise";

      let profile: KieranProfile;
      let memories: KieranMemory[] = [];

      if (userEmail) {
        profile = await storage.getOrCreateKieranProfile(userEmail, userType, userId);
        memories = await storage.getKieranMemories(profile.id, 15);
      } else {
        profile = {
          id: "anonymous",
          userId: null,
          email: "anonymous@temp.local",
          userType,
          isCreator: false,
          toneSettings: { formality: 50, empathy: 50, directness: 50 },
          knowledgeFocus: null,
          interactionStyle: "balanced",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

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
        profile,
        memories,
        conversationHistory
      );

      const assistantMessage = await storage.createChatMessage({
        content: aiResponse,
        role: "assistant",
        userType,
        userId,
      });

      if (userEmail && profile.id !== "anonymous") {
        extractAndStoreMemory(profile.id, result.data.content, aiResponse);
      }

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
