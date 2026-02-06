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
  ArrowLeftRight,
  Shield,
  Zap,
  Globe,
  Lock,
  RefreshCw,
  Layers,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  GitBranch,
  Loader2,
  Building2,
  Wallet,
  TrendingUp,
  Network,
} from "lucide-react";

type ProjectWithCaseStudy = Project & { caseStudy: unknown };

const features = [
  {
    icon: Shield,
    title: "Military-Grade Security",
    description: "Every transaction is protected by multi-layered encryption and real-time threat monitoring across both ecosystems.",
  },
  {
    icon: Zap,
    title: "Instant Synchronization",
    description: "Near-instantaneous bridging between CeFi and DeFi ecosystems with sub-second latency and atomic settlement.",
  },
  {
    icon: Globe,
    title: "Global Compatibility",
    description: "Works seamlessly with major centralized exchanges and decentralized protocols across 15+ blockchain networks.",
  },
  {
    icon: Lock,
    title: "Non-Custodial Architecture",
    description: "Your assets remain under your control throughout the entire bridging process via smart contract escrow.",
  },
  {
    icon: RefreshCw,
    title: "Smart Rebalancing",
    description: "AI-powered portfolio optimization across CeFi and DeFi positions for maximum capital efficiency.",
  },
  {
    icon: BarChart3,
    title: "Unified Analytics",
    description: "Single dashboard view of all positions, yields, and performance metrics across centralized and decentralized venues.",
  },
];

const architectureLayers = [
  { label: "User Interface", detail: "Unified dashboard with portfolio view, trade execution, and analytics", color: "hsl(187 100% 50% / 0.15)" },
  { label: "Orchestration Engine", detail: "Route optimization, gas estimation, MEV protection, and transaction batching", color: "hsl(187 100% 50% / 0.12)" },
  { label: "Bridge Protocol", detail: "Cross-chain messaging, liquidity aggregation, and atomic swap coordination", color: "hsl(187 100% 50% / 0.09)" },
  { label: "Settlement Layer", detail: "On-chain verification, ZK proofs, and finality confirmation across networks", color: "hsl(187 100% 50% / 0.06)" },
];

const useCases = [
  {
    icon: Wallet,
    title: "Portfolio Rebalancing",
    description: "Automatically maintain target allocations across CEX holdings and DeFi yield positions without manual transfers.",
  },
  {
    icon: TrendingUp,
    title: "Yield Optimization",
    description: "Identify and capture yield differentials between centralized lending platforms and decentralized protocols.",
  },
  {
    icon: Building2,
    title: "Institutional On-Ramp",
    description: "Enable regulated entities to access DeFi yields while maintaining compliance through CeFi-grade reporting.",
  },
  {
    icon: Network,
    title: "Cross-Chain Arbitrage",
    description: "Execute atomic arbitrage across multiple chains and exchanges with guaranteed settlement or full rollback.",
  },
];

const specs = [
  { label: "Supported Networks", value: "15+ EVM & Non-EVM Chains" },
  { label: "Settlement Time", value: "< 30 seconds average" },
  { label: "Bridge Latency", value: "< 500ms routing" },
  { label: "Max Single Transfer", value: "$10M equivalent" },
  { label: "Security Audits", value: "3 independent firms" },
  { label: "Uptime SLA", value: "99.95%" },
];

const roadmap = [
  { phase: "Phase 1", title: "Core Bridge", status: "completed" as const, items: ["EVM chain support", "CEX API integrations", "Basic routing engine"] },
  { phase: "Phase 2", title: "Smart Routing", status: "completed" as const, items: ["Multi-path optimization", "Gas estimation", "MEV protection"] },
  { phase: "Phase 3", title: "AI Rebalancing", status: "active" as const, items: ["Portfolio analytics", "Auto-rebalancing", "Yield detection"] },
  { phase: "Phase 4", title: "Institutional", status: "upcoming" as const, items: ["Compliance module", "Audit trails", "Multi-sig support"] },
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

export default function FeatureCeFiDeFi() {
  const { data: projects = [], isLoading } = useQuery<ProjectWithCaseStudy[]>({
    queryKey: ['/api/projects'],
  });

  const project = projects.find(p => p.slug === 'cefi-defi-bridge');

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
              <ArrowLeftRight className="w-10 h-10 text-primary" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5" data-testid="badge-category">
                Core Technology
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
              CeFi-DeFi Sync
            </h1>

            <p className="text-muted-foreground font-heading tracking-wide max-w-3xl mx-auto text-lg leading-relaxed" data-testid="text-feature-description">
              A next-generation protocol enabling seamless interoperability between centralized and decentralized
              finance ecosystems. Bridging the gap between traditional finance infrastructure and blockchain-native
              protocols with military-grade security and sub-second execution.
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
                How It Works
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The CeFi-DeFi Sync protocol creates a secure, bidirectional bridge between centralized exchanges and
                  decentralized protocols. Using advanced cryptographic proofs and real-time market data, it enables users
                  to optimize their portfolio allocation across both ecosystems simultaneously.
                </p>
                <p>
                  Our proprietary liquidity aggregation engine scans multiple venues in milliseconds to ensure the best
                  execution prices. Whether you're moving assets from Coinbase to Uniswap or rebalancing between Binance and
                  Aave, the Sync protocol handles the complexity invisibly while protecting against MEV extraction.
                </p>
                <p>
                  All operations are fully auditable on-chain while maintaining privacy through zero-knowledge proofs.
                  This hybrid approach combines the regulatory compliance of CeFi with the transparency and innovation of DeFi,
                  creating a unified financial operating layer for the next generation of digital asset management.
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
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-xl border-primary/20 overflow-visible"
                style={{ boxShadow: "0 0 15px hsl(187 100% 50% / 0.05)" }}
                data-testid={`card-feature-item-${index}`}
              >
                <CardContent className="p-6">
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                    style={{
                      background: "hsl(187 100% 50% / 0.1)",
                      border: "1px solid hsl(187 100% 50% / 0.2)",
                    }}
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
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
                The CeFi-DeFi Sync protocol is a core component of the Luthor.Tech ecosystem, designed to work seamlessly
                with other platform capabilities for a unified experience.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/features/ai-companion">
                  <div className="p-4 rounded-md hover-elevate cursor-pointer" style={{ background: "hsl(187 100% 50% / 0.03)", border: "1px solid hsl(187 100% 50% / 0.1)" }} data-testid="link-integration-ai">
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-heading font-semibold text-sm">AI Companion</p>
                        <p className="text-xs text-muted-foreground">AI-powered trade recommendations and risk analysis</p>
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
                        <p className="text-xs text-muted-foreground">Hands-free portfolio management via voice commands</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 ml-auto" />
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/contact">
              <Button
                className="px-8"
                style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.3)" }}
                data-testid="button-contact-cta"
              >
                Request Access
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
