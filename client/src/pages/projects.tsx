import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Lock, Cpu, Shield, Zap, Wrench, Disc3, LayoutDashboard } from "lucide-react";
import { Link } from "wouter";

const projects = [
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
    id: "rvfixin",
    title: "RVFixin.com",
    description: "A comprehensive RV repair and maintenance resource website that I maintain and manage. Helping RV enthusiasts with troubleshooting guides, repair tutorials, and expert advice.",
    status: "Active",
    tags: ["Web Development", "Content Management", "RV Maintenance"],
    icon: Wrench,
    url: "https://rvfixin.com",
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
