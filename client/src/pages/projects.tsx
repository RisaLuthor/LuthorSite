import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ExternalLink, Cpu, Shield, Zap, Wrench, Disc3, LayoutDashboard, BookOpen, ChevronDown, Lock, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Project, CaseStudy } from "@shared/schema";

type ProjectWithCaseStudy = Project & { caseStudy: CaseStudy | null };

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Cpu, Shield, Lock, Wrench, Disc3, LayoutDashboard, BookOpen,
};

function getStatusColor(status: string | null) {
  switch (status) {
    case "Active": return "border-green-500/50 text-green-400 bg-green-500/10";
    case "Development": return "border-yellow-500/50 text-yellow-400 bg-yellow-500/10";
    case "Research": return "border-purple-500/50 text-purple-400 bg-purple-500/10";
    case "Completed": return "border-blue-500/50 text-blue-400 bg-blue-500/10";
    default: return "border-primary/50 text-primary bg-primary/10";
  }
}

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery<ProjectWithCaseStudy[]>({
    queryKey: ['/api/projects'],
  });

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

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No projects found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project) => {
                const IconComponent = iconMap[project.icon] || Zap;
                return (
                  <Card
                    key={project.id}
                    className="group bg-card/50 backdrop-blur-xl border-primary/20 transition-all duration-500 hover:-translate-y-1 overflow-visible"
                    style={{
                      boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)",
                    }}
                    data-testid={`card-project-${project.slug}`}
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
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <Badge
                          variant="outline"
                          className={`shrink-0 ${getStatusColor(project.status)}`}
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <h3
                        className="font-heading text-xl font-semibold tracking-wide mb-3"
                        style={{ color: "hsl(187 100% 70%)" }}
                        data-testid={`text-project-title-${project.slug}`}
                      >
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4" data-testid={`text-project-desc-${project.slug}`}>
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
                              data-testid={`button-case-study-${project.slug}`}
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
                          data-testid={`button-visit-${project.slug}`}
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
                          data-testid={`button-explore-${project.slug}`}
                        >
                          <Link href={project.internalPath}>
                            <Disc3 className="w-4 h-4 mr-2" />
                            Explore Project
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
