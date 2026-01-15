import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, FileText, ExternalLink } from "lucide-react";

const labProjects = [
  {
    title: "Kieran Core",
    description: "Distributed AI orchestration engine: Mac mini core + Raspberry Pi edge nodes with encrypted coordination.",
    status: "Building",
    statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
    tags: ["Distributed Systems", "Edge", "Orchestration", "gRPC", "Observability"],
    briefLink: "/labs/kieran-core",
    sourceLink: "https://github.com/RisaLuthor/kieran-core",
  },
  {
    title: "Sentinel",
    description: "Zero-trust security layer for AI agents: mTLS, device identity, attestation, policy enforcement, audit trails.",
    status: "Designing",
    statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    tags: ["Zero Trust", "mTLS", "IAM", "Attestation", "Security"],
    briefLink: "/labs/sentinel",
    sourceLink: "https://github.com/RisaLuthor/sentinel-zero-trust",
  },
  {
    title: "Mnemosyne",
    description: "Persistent memory engine with encrypted storage, vector recall, temporal decay, and retrieval evaluation.",
    status: "Designing",
    statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    tags: ["Memory", "pgvector", "Encryption", "Retrieval", "Evaluation"],
    briefLink: "/labs/mnemosyne",
    sourceLink: "https://github.com/RisaLuthor/mnemosyne-memory",
  },
  {
    title: "Aether",
    description: "Emotional intelligence engine: sentiment/state modeling and adaptive response tuning over time.",
    status: "Planning",
    statusColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    tags: ["Emotion AI", "State Models", "Personalization", "Time-Series"],
    briefLink: "/labs/aether",
    sourceLink: "https://github.com/RisaLuthor/aether-emotion",
  },
  {
    title: "Ethica",
    description: "Ethical AI governance toolkit: consent, bias checks, explainability logs, and operational guardrails.",
    status: "Planning",
    statusColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    tags: ["AI Governance", "Ethics", "Auditability", "Compliance"],
    briefLink: "/labs/ethica",
    sourceLink: "https://github.com/RisaLuthor/ethica-ai",
  },
];

export default function Labs() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(187 100% 50% / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(187 100% 50% / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider mb-4"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 20px hsl(187 100% 50% / 0.5), 0 0 40px hsl(187 100% 50% / 0.3)",
              }}
              data-testid="text-labs-title"
            >
              Labs
            </h1>

            <p
              className="font-heading text-lg sm:text-xl tracking-wide text-primary/80 mb-4"
              style={{ textShadow: "0 0 10px hsl(187 100% 50% / 0.3)" }}
            >
              Graduate capstone research + Luthor.Tech applied R&D.
            </p>

            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Distributed architecture. Persistent memory. Zero-trust security. Emotional intelligence. Ethical AI design.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/RisaLuthor" target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-primary text-primary-foreground font-heading tracking-wide"
                  style={{ boxShadow: "0 0 15px hsl(187 100% 50% / 0.3)" }}
                  data-testid="button-view-github"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View GitHub
                </Button>
              </a>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary font-heading tracking-wide"
                  data-testid="button-read-capstone"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Read the Capstone
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labProjects.map((project) => (
                <Card
                  key={project.title}
                  className="bg-card/80 border-primary/20 hover-elevate overflow-hidden"
                  style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.05)" }}
                  data-testid={`card-lab-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <h3
                        className="font-heading text-xl font-semibold text-primary"
                        style={{ textShadow: "0 0 10px hsl(187 100% 50% / 0.3)" }}
                      >
                        {project.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-xs ${project.statusColor}`}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-border/50 text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Link href={project.briefLink}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/50 text-primary font-heading text-xs"
                          data-testid={`button-brief-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <FileText className="w-3 h-3 mr-1.5" />
                          System Brief
                        </Button>
                      </Link>
                      <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border/50 text-muted-foreground font-heading text-xs"
                          data-testid={`button-source-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <ExternalLink className="w-3 h-3 mr-1.5" />
                          Source
                        </Button>
                      </a>
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
                Luthor.Tech Labs
              </span>
              <p className="text-sm text-muted-foreground">
                Graduate Capstone Research & Applied R&D
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
