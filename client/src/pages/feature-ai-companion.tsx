import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Bot, Brain, MessageSquare, Sparkles, Clock, Target } from "lucide-react";

const capabilities = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "Continuously evolves understanding based on your interactions and preferences.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Engage in fluid, context-aware dialogues that feel genuinely human.",
  },
  {
    icon: Sparkles,
    title: "Creative Assistance",
    description: "From problem-solving to content creation, unlock new possibilities.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "24/7 assistance that remembers your history and anticipates your needs.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Helps you achieve objectives with personalized guidance and tracking.",
  },
];

export default function FeatureAICompanion() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center mb-16">
            <div
              className="w-20 h-20 rounded-md mx-auto mb-6 flex items-center justify-center"
              style={{
                background: "hsl(187 100% 50% / 0.1)",
                border: "1px solid hsl(187 100% 50% / 0.3)",
                boxShadow: "0 0 30px hsl(187 100% 50% / 0.3)",
              }}
            >
              <Bot className="w-10 h-10 text-primary" />
            </div>

            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/5">
              Intelligence System
            </Badge>

            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-6"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-feature-title"
            >
              AI Companion System
            </h1>

            <p className="text-muted-foreground font-heading tracking-wide max-w-3xl mx-auto text-lg leading-relaxed" data-testid="text-feature-description">
              Advanced artificial intelligence companion designed to assist, learn, and evolve with your digital journey.
              Experience a new paradigm of human-AI collaboration powered by the Luthor.Tech neural core.
            </p>
          </div>

          <Card
            className="bg-card/50 backdrop-blur-xl border-primary/20 mb-12"
            style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
          >
            <CardContent className="p-8">
              <h2 className="font-heading text-xl font-semibold mb-6" style={{ color: "hsl(187 100% 70%)" }}>
                The Future of Personal AI
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The AI Companion System represents the next evolution in personal artificial intelligence. Unlike
                  traditional AI assistants that simply respond to commands, our companion develops a genuine understanding
                  of your goals, communication style, and preferences over time.
                </p>
                <p>
                  Built on the Luthor.Tech neural core architecture, the companion leverages advanced transformer models
                  with proprietary enhancements for contextual memory and emotional intelligence. It doesn't just process
                  your requests—it anticipates them.
                </p>
                <p>
                  Whether you need help with complex research, creative brainstorming, personal productivity, or simply
                  want engaging conversation, the AI Companion adapts its personality and approach to match your needs.
                  Your data remains private, encrypted, and under your complete control.
                </p>
              </div>
            </CardContent>
          </Card>

          <h2 className="font-heading text-xl font-semibold mb-8 text-center" style={{ color: "hsl(187 100% 70%)" }}>
            Core Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-xl border-primary/20 overflow-visible"
                style={{ boxShadow: "0 0 15px hsl(187 100% 50% / 0.05)" }}
                data-testid={`card-capability-item-${index}`}
              >
                <CardContent className="p-6">
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                    style={{
                      background: "hsl(187 100% 50% / 0.1)",
                      border: "1px solid hsl(187 100% 50% / 0.2)",
                    }}
                  >
                    <capability.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{capability.title}</h3>
                  <p className="text-muted-foreground text-sm">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/#chat">
              <Button
                className="px-8"
                style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.3)" }}
                data-testid="button-try-demo"
              >
                Try the Demo
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
