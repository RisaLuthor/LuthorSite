import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Box } from "lucide-react";

interface SystemBriefProps {
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  architecture: string;
  roadmap: string[];
  sourceLink: string;
}

export function SystemBrief({
  title,
  subtitle,
  problem,
  approach,
  architecture,
  roadmap,
  sourceLink,
}: SystemBriefProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-16 relative overflow-hidden">
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

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/labs">
              <Button
                variant="ghost"
                size="sm"
                className="mb-6 text-muted-foreground"
                data-testid="button-back-to-labs"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Labs
              </Button>
            </Link>

            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-3"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 20px hsl(187 100% 50% / 0.5), 0 0 40px hsl(187 100% 50% / 0.3)",
              }}
              data-testid="text-brief-title"
            >
              {title}
            </h1>

            <p
              className="font-heading text-lg tracking-wide text-primary/80 mb-8"
              style={{ textShadow: "0 0 10px hsl(187 100% 50% / 0.3)" }}
            >
              {subtitle}
            </p>

            <div className="space-y-6">
              <Card className="bg-card/80 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{problem}</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{approach}</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">{architecture}</p>
                  <div
                    className="w-full h-48 rounded-md border border-dashed border-primary/30 flex items-center justify-center bg-primary/5"
                    data-testid="diagram-placeholder"
                  >
                    <div className="text-center text-muted-foreground">
                      <Box className="w-8 h-8 mx-auto mb-2 text-primary/50" />
                      <p className="text-sm">Architecture Diagram</p>
                      <p className="text-xs text-muted-foreground/70">Coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {roadmap.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span
                          className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5"
                          style={{ textShadow: "0 0 5px hsl(187 100% 50% / 0.5)" }}
                        >
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="pt-4">
                <a href={sourceLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="bg-primary text-primary-foreground font-heading tracking-wide"
                    style={{ boxShadow: "0 0 15px hsl(187 100% 50% / 0.3)" }}
                    data-testid="button-view-source"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Source
                  </Button>
                </a>
              </div>
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
                System Brief: {title}
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

export function LabKieranCore() {
  return (
    <SystemBrief
      title="Kieran Core"
      subtitle="Distributed AI Orchestration Engine"
      problem="Modern AI systems require coordination across multiple compute nodes while maintaining low latency, fault tolerance, and secure communication. Traditional centralized architectures create single points of failure and bottlenecks."
      approach="Build a distributed orchestration layer using a Mac mini as the central coordinator and Raspberry Pi nodes as edge compute units. Implement encrypted gRPC channels for inter-node communication with automatic failover and load balancing."
      architecture="The system uses a hub-and-spoke topology where the Mac mini core handles task scheduling, state management, and model orchestration. Edge nodes process local inference workloads and report metrics back to the core. All communication is encrypted with TLS 1.3 and authenticated via mutual certificates."
      roadmap={[
        "Core orchestration engine with task queue and scheduler",
        "Edge node registration and health monitoring",
        "Encrypted gRPC communication layer",
        "Distributed state synchronization",
        "Observability dashboard with metrics and tracing",
        "Auto-scaling and failover mechanisms",
      ]}
      sourceLink="https://github.com/RisaLuthor/kieran-core"
    />
  );
}

export function LabSentinel() {
  return (
    <SystemBrief
      title="Sentinel"
      subtitle="Zero-Trust Security Layer for AI Agents"
      problem="AI agents operating across distributed systems need robust security without compromising performance. Traditional perimeter-based security is insufficient for dynamic, multi-agent environments."
      approach="Implement a zero-trust architecture where every request is authenticated and authorized regardless of origin. Use mTLS for transport security, device attestation for identity verification, and policy-based access control for granular permissions."
      architecture="Sentinel acts as a security mesh overlay on the Kieran ecosystem. Each component maintains its own identity certificate, and all inter-service communication passes through policy enforcement points. Audit trails are cryptographically signed and stored for compliance."
      roadmap={[
        "Certificate authority and identity management",
        "mTLS implementation for all services",
        "Device attestation and verification",
        "Policy engine with declarative rules",
        "Real-time audit logging and alerting",
        "Compliance reporting dashboard",
      ]}
      sourceLink="https://github.com/RisaLuthor/sentinel-zero-trust"
    />
  );
}

export function LabMnemosyne() {
  return (
    <SystemBrief
      title="Mnemosyne"
      subtitle="Persistent Memory Engine"
      problem="AI assistants lack true persistent memory, losing context across sessions. Existing solutions either sacrifice privacy through cloud storage or lack sophisticated retrieval mechanisms."
      approach="Build an encrypted local-first memory system with vector embeddings for semantic search, temporal decay for relevance scoring, and evaluation metrics for retrieval quality. All data remains encrypted at rest and in transit."
      architecture="Mnemosyne uses PostgreSQL with pgvector for vector storage, with encryption handled at the application layer. Memory entries are tagged with temporal metadata and importance scores. The retrieval system combines semantic similarity with recency weighting and user-defined filters."
      roadmap={[
        "Encrypted vector storage with pgvector",
        "Semantic embedding pipeline",
        "Temporal decay and importance scoring",
        "Multi-modal memory support (text, images, audio)",
        "Retrieval quality evaluation framework",
        "Memory consolidation and summarization",
      ]}
      sourceLink="https://github.com/RisaLuthor/mnemosyne-memory"
    />
  );
}

export function LabAether() {
  return (
    <SystemBrief
      title="Aether"
      subtitle="Emotional Intelligence Engine"
      problem="AI systems struggle to maintain contextual emotional awareness, leading to responses that feel robotic or inappropriate. Understanding and adapting to user emotional state improves interaction quality."
      approach="Develop a sentiment and emotional state modeling system that tracks user affect over time, identifies patterns, and adjusts response generation parameters to match appropriate tone and empathy levels."
      architecture="Aether processes interaction signals through multiple analysis layers: lexical sentiment, conversational context, and historical patterns. State models are updated in real-time and used to modulate response generation parameters in the core AI system."
      roadmap={[
        "Multi-signal sentiment analysis pipeline",
        "Emotional state modeling with temporal tracking",
        "Response adaptation parameter tuning",
        "Pattern recognition for recurring states",
        "Personalization profiles per user",
        "Ethical boundaries and safety constraints",
      ]}
      sourceLink="https://github.com/RisaLuthor/aether-emotion"
    />
  );
}

export function LabEthica() {
  return (
    <SystemBrief
      title="Ethica"
      subtitle="Ethical AI Governance Toolkit"
      problem="AI systems require transparent governance, bias detection, and ethical guardrails. Without proper oversight, AI can cause harm through biased outputs, privacy violations, or misuse."
      approach="Create a comprehensive governance framework with consent management, automated bias detection, explainability logging, and operational guardrails. Enable auditors and users to understand AI decision-making processes."
      architecture="Ethica integrates as a middleware layer that intercepts AI requests and responses. It maintains consent records, runs bias checks against configurable benchmarks, generates explanation logs for decisions, and enforces operational limits defined by administrators."
      roadmap={[
        "Consent management and tracking system",
        "Automated bias detection benchmarks",
        "Explainability logging for decisions",
        "Configurable operational guardrails",
        "Audit trail with cryptographic integrity",
        "Compliance reporting for regulations",
      ]}
      sourceLink="https://github.com/RisaLuthor/ethica-ai"
    />
  );
}
