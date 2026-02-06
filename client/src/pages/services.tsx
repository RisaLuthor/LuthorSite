import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Brain,
  Code,
  Database,
  Server,
  Shield,
  Cloud,
  Cpu,
  Bot,
  Workflow,
  LineChart,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";
import type { Service } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Code, Database, Server, Shield, Cloud, Cpu, Bot, Workflow, LineChart, Lock, Zap,
};

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Understanding your business needs, challenges, and goals through in-depth consultation.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Developing a comprehensive technical roadmap aligned with your objectives and timeline.",
  },
  {
    step: "03",
    title: "Development",
    description: "Building your solution using best practices, modern technologies, and agile methodologies.",
  },
  {
    step: "04",
    title: "Deployment",
    description: "Seamless deployment with thorough testing, documentation, and knowledge transfer.",
  },
];

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 
                className="font-display text-3xl lg:text-4xl font-bold tracking-wider mb-4"
                style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 20px hsl(187 100% 50% / 0.5)" }}
                data-testid="text-services-title"
              >
                Skill Sets
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transforming ideas into powerful, scalable solutions. From AI-driven applications to enterprise system modernization, 
                I deliver technology that drives results.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No services found.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  const IconComponent = iconMap[service.icon] || Zap;
                  return (
                    <Card 
                      key={service.id}
                      className={`bg-card/80 border-primary/20 hover-elevate transition-all ${
                        service.highlight ? "ring-1 ring-primary/50" : ""
                      }`}
                      style={{ 
                        boxShadow: service.highlight 
                          ? "0 0 30px hsl(187 100% 50% / 0.15)" 
                          : "0 0 20px hsl(187 100% 50% / 0.05)" 
                      }}
                      data-testid={`card-service-${service.id}`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div 
                            className="w-12 h-12 rounded-md flex items-center justify-center shrink-0"
                            style={{ 
                              background: "hsl(187 100% 50% / 0.1)", 
                              border: "1px solid hsl(187 100% 50% / 0.3)" 
                            }}
                          >
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          {service.highlight && (
                            <Badge className="bg-primary/20 text-primary border-primary/50">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-lg mt-4">{service.title}</h3>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 
                className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-4"
                style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
              >
                How I Work
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A structured approach to delivering exceptional results, from initial consultation to final deployment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="bg-card/80 border-primary/20 h-full">
                    <CardContent className="p-6">
                      <div 
                        className="text-4xl font-display font-bold mb-4"
                        style={{ color: "hsl(187 100% 50% / 0.3)" }}
                      >
                        {step.step}
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2 text-primary">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card 
              className="bg-card/80 border-primary/30 overflow-hidden"
              style={{ boxShadow: "0 0 40px hsl(187 100% 50% / 0.1)" }}
            >
              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <h2 
                      className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-4"
                      style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
                    >
                      Ready to Transform Your Business?
                    </h2>
                    <p className="text-muted-foreground max-w-xl">
                      Let's discuss how AI and modern technology can solve your challenges and drive growth. 
                      Schedule a consultation to explore the possibilities.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button 
                        size="lg"
                        className="bg-primary text-primary-foreground"
                        style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.4)" }}
                        data-testid="button-contact-cta"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button 
                        variant="outline"
                        size="lg"
                        className="border-primary/50 text-primary hover:bg-primary/10"
                        data-testid="button-about-cta"
                      >
                        Learn More About Me
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
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
