import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ExternalLink, Github, Lock, Cpu, Shield, Zap, Wrench, Disc3, LayoutDashboard, BookOpen, ChevronDown } from "lucide-react";
import { Link } from "wouter";

interface CaseStudy {
  deliverables: string[];
  tools: string[];
  closing: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  url?: string;
  internalPath?: string;
  caseStudy?: CaseStudy;
}

const projects: Project[] = [
  {
    id: "cefi-defi-bridge",
    title: "CeFi-DeFi Bridge Protocol",
    description: "A next-generation protocol enabling seamless interoperability between centralized and decentralized finance ecosystems.",
    status: "Active",
    tags: ["Blockchain", "Finance", "Security"],
    icon: Zap,
  },
  {
    id: "neural-core",
    title: "Neural Core AI Engine",
    description: "Advanced neural network architecture powering the Luthor.Tech AI ecosystem with real-time learning capabilities.",
    status: "Development",
    tags: ["AI", "Machine Learning", "Neural Networks"],
    icon: Cpu,
  },
  {
    id: "voice-auth",
    title: "Voice Authentication System",
    description: "Military-grade voice recognition and authentication system with biometric verification protocols.",
    status: "Active",
    tags: ["Security", "Voice", "Biometrics"],
    icon: Shield,
  },
  {
    id: "quantum-encrypt",
    title: "Quantum Encryption Layer",
    description: "Post-quantum cryptography implementation for future-proof secure communications across all Luthor.Tech systems.",
    status: "Research",
    tags: ["Cryptography", "Quantum", "Security"],
    icon: Lock,
  },
  {
    id: "content-platform-refresh",
    title: "Content Platform Refresh & Automation",
    description: "Led a comprehensive website refresh for a niche content platform, including UX improvements, daily blog publishing pipeline, SEO-focused content workflows, and AI-assisted automation setup.",
    status: "Completed",
    tags: ["Wix", "SEO", "Content Strategy", "AI Automation"],
    icon: Wrench,
    caseStudy: {
      deliverables: [
        "Full Wix website management and ongoing maintenance",
        "Site refresh with improved navigation and mobile UX",
        "Daily blog publishing pipeline with consistent scheduling",
        "SEO-focused content workflow and keyword optimization",
        "AI agent setup for content drafting and automation"
      ],
      tools: ["Wix", "Wix SEO Tools", "AI Content Assistants", "Google Search Console", "Content Scheduling Systems"],
      closing: "Project scope fulfilled. Platform transitioned to client management."
    }
  },
  {
    id: "mp4-holofans",
    title: "MP4 Holographic Display Fans",
    description: "Experience the future of visual display with our holographic fan technology. Browse 500+ ready-to-use holograms or create your own custom holographic content with personalized messages and voice recordings.",
    status: "Active",
    tags: ["Holographic Tech", "3D Display", "Custom Media"],
    icon: Disc3,
    internalPath: "/projects/holofans",
  },
  {
    id: "erp-team-dashboard",
    title: "ERP Team Dashboard",
    description: "Centralized enterprise resource planning dashboard for team coordination, project tracking, and workflow management. Streamlines operations with real-time data visualization and collaborative tools.",
    status: "Active",
    tags: ["Enterprise", "Dashboard", "Team Management"],
    icon: LayoutDashboard,
    internalPath: "/projects/erp-dashboard",
  },
  {
    id: "pagequest",
    title: "PageQuest: Literary Ascent",
    description: "An interactive literary adventure game where you ascend through the world of books. Explore engaging narratives with branching storylines and discovery mechanics.",
    status: "Active",
    tags: ["Game", "Interactive", "Literary"],
    icon: BookOpen,
    url: "https://literary-ascent.replit.app",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-4"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-projects-title"
            >
              Projects
            </h1>
            <p className="text-muted-foreground font-heading tracking-wide max-w-2xl mx-auto" data-testid="text-projects-subtitle">
              Explore the cutting-edge innovations powering the Luthor.Tech AI ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group bg-card/50 backdrop-blur-xl border-primary/20 transition-all duration-500 hover:-translate-y-1 overflow-visible"
                style={{
                  boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)",
                }}
                data-testid={`card-project-${project.id}`}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(187 100% 50% / 0.1)",
                        border: "1px solid hsl(187 100% 50% / 0.3)",
                        boxShadow: "0 0 15px hsl(187 100% 50% / 0.2)",
                      }}
                    >
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`shrink-0 ${
                        project.status === "Active"
                          ? "border-green-500/50 text-green-400 bg-green-500/10"
                          : project.status === "Development"
                          ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                          : "border-purple-500/50 text-purple-400 bg-purple-500/10"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <h3
                    className="font-heading text-xl font-semibold tracking-wide mb-3"
                    style={{ color: "hsl(187 100% 70%)" }}
                    data-testid={`text-project-title-${project.id}`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4" data-testid={`text-project-desc-${project.id}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-secondary/50 text-secondary-foreground/80 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {project.caseStudy && (
                    <Collapsible className="mb-4">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-primary/30 text-primary"
                          data-testid={`button-case-study-${project.id}`}
                        >
                          View Case Study Details
                          <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Scope & Deliverables</h4>
                          <ul className="text-sm text-muted-foreground space-y-1.5">
                            {project.caseStudy.deliverables.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Tools & Stack</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.caseStudy.tools.map((tool) => (
                              <Badge
                                key={tool}
                                variant="outline"
                                className="text-xs border-primary/30 text-primary/80"
                              >
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic border-t border-border/50 pt-3">
                          {project.caseStudy.closing}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {project.url && (
                    <Button
                      asChild
                      className="w-full"
                      data-testid={`button-visit-${project.id}`}
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Site
                      </a>
                    </Button>
                  )}
                  {project.internalPath && (
                    <Button
                      asChild
                      className="w-full"
                      data-testid={`button-explore-${project.id}`}
                    >
                      <Link href={project.internalPath}>
                        <Disc3 className="w-4 h-4 mr-2" />
                        Explore Project
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
