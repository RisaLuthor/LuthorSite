import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Code, Globe, Brain, Cpu, Clock, Wrench } from "lucide-react";

const portfolioProjects = [
  {
    id: "rmluthor-platform",
    title: "RMLuthor.us Platform",
    category: "Full-Stack Development",
    description: "AI-driven platform with custom APIs, chat integrations, and automation workflows. Built with React, TypeScript, and Node.js.",
    image: null,
    tags: ["React", "TypeScript", "AI", "Node.js"],
    icon: Globe,
    featured: true,
    status: "live",
    links: {
      live: "https://rmluthor.us",
    },
  },
  {
    id: "rvfixin",
    title: "RVFIXIN.com",
    category: "Web Development",
    description: "RV repair and maintenance resource website providing helpful guides, tips, and information for RV owners and enthusiasts.",
    image: null,
    tags: ["Web Development", "Content", "SEO", "Resources"],
    icon: Wrench,
    featured: true,
    status: "live",
    links: {
      live: "https://rvfixin.com",
    },
  },
  {
    id: "kieran-ai",
    title: "Kieran AI Ecosystem",
    category: "AI Development",
    description: "Personal AI assistant ecosystem running locally on Mac mini since 2022. Leverages Python, SQL, and secure storage for self-hosted AI.",
    image: null,
    tags: ["Python", "AI", "Machine Learning", "SQL"],
    icon: Brain,
    featured: true,
    status: "live",
    links: {},
  },
  {
    id: "ml-api-platform",
    title: "ML Model API Platform",
    category: "AI & APIs",
    description: "Converted ML models into functional APIs for real-world applications with governance and compliance monitoring.",
    image: null,
    tags: ["Machine Learning", "API", "Python", "Governance"],
    icon: Cpu,
    featured: false,
    status: "live",
    links: {},
  },
  {
    id: "coming-soon-1",
    title: "Project Coming Soon",
    category: "Future Project",
    description: "An exciting new project is in development. Check back soon for updates on this upcoming addition to the portfolio.",
    image: null,
    tags: ["Coming Soon"],
    icon: Clock,
    featured: false,
    status: "coming-soon",
    links: {},
  },
  {
    id: "coming-soon-2",
    title: "Project Coming Soon",
    category: "Future Project",
    description: "Another innovative project is being developed. Stay tuned for more details on this upcoming work.",
    image: null,
    tags: ["Coming Soon"],
    icon: Clock,
    featured: false,
    status: "coming-soon",
    links: {},
  },
  {
    id: "coming-soon-3",
    title: "Project Coming Soon",
    category: "Future Project",
    description: "More projects are on the way. This space will showcase additional work and achievements.",
    image: null,
    tags: ["Coming Soon"],
    icon: Clock,
    featured: false,
    status: "coming-soon",
    links: {},
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h1 
                className="font-display text-3xl lg:text-4xl font-bold tracking-wider mb-4"
                style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 20px hsl(187 100% 50% / 0.5)" }}
                data-testid="text-portfolio-title"
              >
                Portfolio
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                My Last Projects: A showcase of enterprise systems, AI solutions, and full-stack applications 
                that demonstrate expertise in modern technology and innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioProjects.map((project) => (
                <Card 
                  key={project.id}
                  className={`group bg-card/80 border-primary/20 overflow-hidden hover-elevate transition-all ${
                    project.featured ? "ring-1 ring-primary/30" : ""
                  } ${project.status === "coming-soon" ? "opacity-75" : ""}`}
                  style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.05)" }}
                  data-testid={`card-portfolio-${project.id}`}
                >
                  <div 
                    className="h-48 relative overflow-hidden"
                    style={{ 
                      background: "linear-gradient(135deg, hsl(187 100% 50% / 0.1), hsl(220 100% 50% / 0.1))",
                    }}
                  >
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          linear-gradient(hsl(187 100% 50% / 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(187 100% 50% / 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-20 h-20 rounded-md flex items-center justify-center"
                        style={{ 
                          background: "hsl(187 100% 50% / 0.1)", 
                          border: "2px solid hsl(187 100% 50% / 0.3)",
                          boxShadow: "0 0 30px hsl(187 100% 50% / 0.2)"
                        }}
                      >
                        <project.icon className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    {project.featured && project.status !== "coming-soon" && (
                      <Badge 
                        className="absolute top-4 right-4 bg-primary/90 text-primary-foreground"
                      >
                        Featured
                      </Badge>
                    )}
                    {project.status === "coming-soon" && (
                      <Badge 
                        className="absolute top-4 right-4 bg-muted text-muted-foreground"
                      >
                        Coming Soon
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                  </div>

                  <CardContent className="p-6">
                    <Badge 
                      variant="outline" 
                      className="mb-3 border-primary/50 text-primary text-xs"
                    >
                      {project.category}
                    </Badge>
                    <h3 
                      className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors"
                      data-testid={`text-portfolio-title-${project.id}`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-secondary/50 text-secondary-foreground/80 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge 
                          variant="secondary" 
                          className="bg-secondary/50 text-secondary-foreground/80 text-xs"
                        >
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.links.live && (
                        <a 
                          href={project.links.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-primary/50 text-primary hover:bg-primary/10"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Live
                          </Button>
                        </a>
                      )}
                      {project.status !== "coming-soon" && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Code className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-8 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span
                className="font-display text-lg font-bold tracking-wider text-primary"
                style={{ textShadow: "0 0 10px hsl(187 100% 50%)" }}
              >
                RMLuthor.us
              </span>
              <p className="text-sm text-muted-foreground">
                The Luthor.Tech AI Ecosystem Core
              </p>
              <p className="text-sm text-muted-foreground">
                Luthor.Tech 2025
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
