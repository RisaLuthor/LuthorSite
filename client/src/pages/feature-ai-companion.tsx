import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";
import {
  ArrowLeft,
  Bot,
  Brain,
  MessageSquare,
  Sparkles,
  Clock,
  Target,
  Layers,
  ArrowRight,
  CheckCircle2,
  Loader2,
  GitBranch,
  Code2,
  BookOpen,
  Users,
  Shield,
  Database,
  Cpu,
} from "lucide-react";

type ProjectWithCaseStudy = Project & { caseStudy: unknown };

const capabilities = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "Continuously evolves understanding based on your interactions, building a persistent memory of your preferences and working patterns.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Engage in fluid, context-aware dialogues with support for multi-turn reasoning and nuanced comprehension.",
  },
  {
    icon: Sparkles,
    title: "Creative Assistance",
    description: "From problem-solving to content creation, unlock new possibilities with generative AI that adapts to your creative style.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "24/7 assistance with session persistence, picking up exactly where you left off across devices and time zones.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Helps you achieve objectives with personalized guidance, progress tracking, and proactive milestone suggestions.",
  },
  {
    icon: Shield,
    title: "Privacy-First Design",
    description: "All conversations are encrypted end-to-end. Your data stays under your control with configurable retention policies.",
  },
];

const architectureLayers = [
  { label: "Conversation Interface", detail: "Natural language input with rich media support, code blocks, and interactive elements", color: "hsl(187 100% 50% / 0.15)" },
  { label: "Context Engine", detail: "Session memory, user preference tracking, conversation threading, and topic classification", color: "hsl(187 100% 50% / 0.12)" },
  { label: "Neural Core", detail: "Multi-model orchestration with specialized modules for reasoning, creativity, and analysis", color: "hsl(187 100% 50% / 0.09)" },
  { label: "Knowledge Base", detail: "RAG pipeline with vector storage, real-time web access, and domain-specific knowledge graphs", color: "hsl(187 100% 50% / 0.06)" },
];

const useCases = [
  {
    icon: Code2,
    title: "Development Partner",
    description: "Pair-program with an AI that understands your codebase, suggests architecture improvements, and writes production-ready code.",
  },
  {
    icon: BookOpen,
    title: "Research Assistant",
    description: "Synthesize complex information from multiple sources, generate summaries, and build structured knowledge bases from raw data.",
  },
  {
    icon: Users,
    title: "Personal Productivity",
    description: "Manage tasks, draft communications, schedule meetings, and organize your digital workflow with intelligent automation.",
  },
  {
    icon: Database,
    title: "Data Analysis",
    description: "Query databases using natural language, generate visualizations, and uncover patterns in complex datasets.",
  },
];

const specs = [
  { label: "Response Latency", value: "< 200ms first token" },
  { label: "Context Window", value: "128K tokens" },
  { label: "Supported Languages", value: "95+ languages" },
  { label: "User Type Modes", value: "Personal & Enterprise" },
  { label: "Memory Persistence", value: "Configurable TTL" },
  { label: "API Availability", value: "99.9% uptime" },
];

const roadmap = [
  { phase: "Phase 1", title: "Core Assistant", status: "completed" as const, items: ["Chat interface", "Context awareness", "User type adaptation"] },
  { phase: "Phase 2", title: "Neural Core v2", status: "completed" as const, items: ["Multi-model routing", "Enhanced memory", "Code generation"] },
  { phase: "Phase 3", title: "Ecosystem Integration", status: "active" as const, items: ["Voice control bridge", "CeFi-DeFi advisor", "Calendar sync"] },
  { phase: "Phase 4", title: "Autonomous Agent", status: "upcoming" as const, items: ["Task execution", "Workflow automation", "Proactive insights"] },
];

function getStatusColor(status: string | null) {
  switch (status) {
    case "Active": return "border-green-500/50 text-green-400 bg-green-500/10";
    case "Development": return "border-yellow-500/50 text-yellow-400 bg-yellow-500/10";
    case "Research": return "border-purple-500/50 text-purple-400 bg-purple-500/10";
    case "Completed": return "border-blue-500/50 text-blue-400 bg-blue-500/10";
    default: return "border-primary/50 text-primary bg-primary/10";
  }
}

export default function FeatureAICompanion() {
  const { data: projects = [], isLoading } = useQuery<ProjectWithCaseStudy[]>({
    queryKey: ['/api/projects'],
  });

  const project = projects.find(p => p.slug === 'neural-core');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects">
            <Button variant="ghost" className="mb-8 text-muted-foreground" data-testid="button-back-projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
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

            <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5" data-testid="badge-category">
                Intelligence System
              </Badge>
              {isLoading ? (
                <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                  Loading
                </Badge>
              ) : project ? (
                <Badge variant="outline" className={getStatusColor(project.status)} data-testid="badge-status">
                  {project.status}
                </Badge>
              ) : null}
            </div>

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
              Advanced artificial intelligence companion built on the Luthor.Tech Neural Core, designed to assist, learn,
              and evolve with your digital journey. A new paradigm of human-AI collaboration that adapts to your unique
              working style and goals.
            </p>

            {isLoading ? (
              <div className="flex justify-center gap-2 mt-6">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            ) : project ? (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-secondary/50 text-secondary-foreground/80 text-xs" data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
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
                  of your goals, communication style, and preferences over time through persistent contextual memory.
                </p>
                <p>
                  Built on the Luthor.Tech Neural Core architecture, the companion leverages multi-model orchestration
                  with specialized modules for different cognitive tasks. It doesn't just process your requests — it
                  anticipates them. The system routes each query to the optimal model based on complexity, domain, and
                  required reasoning depth.
                </p>
                <p>
                  Two distinct interaction modes — Personal and Enterprise — allow the AI to adapt its tone, depth,
                  and approach based on context. Personal mode offers friendly, conversational assistance for individuals,
                  while Enterprise mode delivers professional, technical responses with structured outputs suitable for
                  business environments.
                </p>
              </div>
            </CardContent>
          </Card>

          <h2 className="font-heading text-xl font-semibold mb-8 text-center" style={{ color: "hsl(187 100% 70%)" }}>
            System Architecture
          </h2>

          <div className="space-y-3 mb-12">
            {architectureLayers.map((layer, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-xl border-primary/20 overflow-visible"
                data-testid={`card-arch-layer-${index}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: layer.color, border: "1px solid hsl(187 100% 50% / 0.2)" }}
                    >
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-muted-foreground font-mono">L{index}</span>
                        <h3 className="font-heading font-semibold">{layer.label}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">{layer.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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

          <h2 className="font-heading text-xl font-semibold mb-8 text-center" style={{ color: "hsl(187 100% 70%)" }}>
            Use Cases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-xl border-primary/20 overflow-visible"
                data-testid={`card-usecase-${index}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(187 100% 50% / 0.1)",
                        border: "1px solid hsl(187 100% 50% / 0.2)",
                      }}
                    >
                      <useCase.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-muted-foreground text-sm">{useCase.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-heading text-xl font-semibold mb-8 text-center" style={{ color: "hsl(187 100% 70%)" }}>
            Technical Specifications
          </h2>

          <Card
            className="bg-card/50 backdrop-blur-xl border-primary/20 mb-12"
            style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map((spec, index) => (
                  <div key={index} className="p-4 rounded-md" style={{ background: "hsl(187 100% 50% / 0.03)", border: "1px solid hsl(187 100% 50% / 0.1)" }} data-testid={`text-spec-${index}`}>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{spec.label}</p>
                    <p className="font-heading font-semibold text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <h2 className="font-heading text-xl font-semibold mb-8 text-center" style={{ color: "hsl(187 100% 70%)" }}>
            Development Roadmap
          </h2>

          <div className="space-y-4 mb-12">
            {roadmap.map((phase, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-xl border-primary/20 overflow-visible"
                data-testid={`card-roadmap-${index}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5">
                      {phase.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : phase.status === "active" ? (
                        <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                      ) : (
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-xs text-primary">{phase.phase}</span>
                        <h3 className="font-heading font-semibold">{phase.title}</h3>
                        <Badge
                          variant="outline"
                          className={
                            phase.status === "completed"
                              ? "border-green-500/50 text-green-400 bg-green-500/10"
                              : phase.status === "active"
                              ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                              : "border-muted-foreground/30 text-muted-foreground bg-muted/10"
                          }
                        >
                          {phase.status === "completed" ? "Completed" : phase.status === "active" ? "In Progress" : "Upcoming"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.items.map((item, i) => (
                          <Badge key={i} variant="secondary" className="bg-secondary/50 text-secondary-foreground/80 text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card
            className="bg-card/50 backdrop-blur-xl border-primary/20 mb-12"
            style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
          >
            <CardContent className="p-8">
              <h2 className="font-heading text-xl font-semibold mb-4" style={{ color: "hsl(187 100% 70%)" }}>
                Ecosystem Integration
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The AI Companion serves as the central intelligence layer of the Luthor.Tech ecosystem, connecting
                all platform capabilities through natural language interaction.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/features/cefi-defi">
                  <div className="p-4 rounded-md hover-elevate cursor-pointer" style={{ background: "hsl(187 100% 50% / 0.03)", border: "1px solid hsl(187 100% 50% / 0.1)" }} data-testid="link-integration-cefi">
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-heading font-semibold text-sm">CeFi-DeFi Sync</p>
                        <p className="text-xs text-muted-foreground">Natural language portfolio management and trade execution</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 ml-auto" />
                    </div>
                  </div>
                </Link>
                <Link href="/features/voice-control">
                  <div className="p-4 rounded-md hover-elevate cursor-pointer" style={{ background: "hsl(187 100% 50% / 0.03)", border: "1px solid hsl(187 100% 50% / 0.1)" }} data-testid="link-integration-voice">
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-heading font-semibold text-sm">Voice Control</p>
                        <p className="text-xs text-muted-foreground">Voice-activated AI interactions with biometric authentication</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 ml-auto" />
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Link href="/#chat">
              <Button
                className="px-8"
                style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.3)" }}
                data-testid="button-try-demo"
              >
                Try the Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
