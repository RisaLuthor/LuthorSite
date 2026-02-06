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
  Mic,
  Shield,
  Fingerprint,
  Waves,
  Lock,
  Scan,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  GitBranch,
  AudioLines,
  Radio,
  Smartphone,
  Building2,
  Volume2,
  KeyRound,
} from "lucide-react";

type ProjectWithCaseStudy = Project & { caseStudy: unknown };

const securityFeatures = [
  {
    icon: Fingerprint,
    title: "Biometric Voiceprint",
    description: "Unique voice signature verification analyzing 100+ vocal characteristics that's nearly impossible to replicate or spoof.",
  },
  {
    icon: Waves,
    title: "Real-time Processing",
    description: "Sub-100ms voice recognition with continuous anti-spoofing analysis running in parallel on dedicated hardware.",
  },
  {
    icon: Shield,
    title: "Multi-Factor Auth",
    description: "Combine voice with other biometric factors for enterprise-grade security with configurable trust levels.",
  },
  {
    icon: Lock,
    title: "Encrypted Channels",
    description: "End-to-end encryption for all voice data transmission and storage using post-quantum cryptographic algorithms.",
  },
  {
    icon: Scan,
    title: "Liveness Detection",
    description: "Advanced AI detects recordings, deepfakes, and voice synthesis attempts with 99.97% accuracy.",
  },
  {
    icon: KeyRound,
    title: "Zero-Knowledge Proof",
    description: "Voice verification without transmitting raw biometric data. Proofs are generated locally and verified remotely.",
  },
];

const architectureLayers = [
  { label: "Voice Capture Layer", detail: "High-fidelity audio capture with noise cancellation, echo suppression, and adaptive gain control", color: "hsl(187 100% 50% / 0.15)" },
  { label: "Signal Processing", detail: "Feature extraction, spectral analysis, formant tracking, and prosody measurement in real-time", color: "hsl(187 100% 50% / 0.12)" },
  { label: "Neural Authentication", detail: "Deep neural network for voiceprint matching, liveness detection, and continuous verification", color: "hsl(187 100% 50% / 0.09)" },
  { label: "Command Execution", detail: "Intent parsing, action routing, permission enforcement, and audit logging for all voice commands", color: "hsl(187 100% 50% / 0.06)" },
];

const useCases = [
  {
    icon: Building2,
    title: "Enterprise Access Control",
    description: "Replace badge systems and passwords with voice-based facility and system access for seamless yet secure workplace authentication.",
  },
  {
    icon: Volume2,
    title: "Hands-Free Operations",
    description: "Control critical systems in environments where manual input is impractical — cleanrooms, operating theaters, industrial floors.",
  },
  {
    icon: Smartphone,
    title: "Mobile Security",
    description: "Continuous passive authentication on mobile devices, silently verifying identity throughout the session without interrupting workflow.",
  },
  {
    icon: Radio,
    title: "IoT Command Center",
    description: "Securely control smart home, vehicle, and IoT ecosystems with authenticated voice commands across all connected devices.",
  },
];

const specs = [
  { label: "Recognition Accuracy", value: "99.97% verified" },
  { label: "Processing Latency", value: "< 100ms end-to-end" },
  { label: "Vocal Features Analyzed", value: "100+ characteristics" },
  { label: "Spoof Detection Rate", value: "99.99% catch rate" },
  { label: "Supported Languages", value: "40+ languages" },
  { label: "Encryption Standard", value: "AES-256 + PQC" },
];

const roadmap = [
  { phase: "Phase 1", title: "Core Biometrics", status: "completed" as const, items: ["Voiceprint enrollment", "Basic verification", "Speaker identification"] },
  { phase: "Phase 2", title: "Anti-Spoofing", status: "completed" as const, items: ["Liveness detection", "Deepfake defense", "Replay attack prevention"] },
  { phase: "Phase 3", title: "Command System", status: "active" as const, items: ["Intent parsing", "Multi-language support", "AI companion bridge"] },
  { phase: "Phase 4", title: "Continuous Auth", status: "upcoming" as const, items: ["Passive verification", "Anomaly detection", "Trust scoring"] },
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

export default function FeatureVoiceControl() {
  const { data: projects = [], isLoading } = useQuery<ProjectWithCaseStudy[]>({
    queryKey: ['/api/projects'],
  });

  const project = projects.find(p => p.slug === 'voice-auth');

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
              <Mic className="w-10 h-10 text-primary" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5" data-testid="badge-category">
                Security Innovation
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
              Voice-Controlled Secure Core
            </h1>

            <p className="text-muted-foreground font-heading tracking-wide max-w-3xl mx-auto text-lg leading-relaxed" data-testid="text-feature-description">
              Military-grade voice recognition and authentication system with biometric verification protocols.
              Your voice becomes the ultimate authentication key in the Luthor.Tech ecosystem, combining
              convenience with uncompromising security.
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
                Military-Grade Voice Security
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Voice-Controlled Secure Core represents the pinnacle of biometric authentication technology.
                  Developed in partnership with leading cybersecurity researchers, this system goes far beyond simple
                  voice recognition to create an impenetrable security layer that adapts and evolves with each interaction.
                </p>
                <p>
                  Our proprietary neural network analyzes over 100 unique vocal characteristics — from pitch and cadence
                  to micro-variations invisible to the human ear. This creates a voiceprint as unique as your fingerprint
                  but far more difficult to compromise. The system processes these features in under 100 milliseconds,
                  enabling seamless authentication without noticeable delay.
                </p>
                <p>
                  Real-time liveness detection ensures that recordings, AI voice cloning, and other spoofing attempts
                  are instantly identified and blocked with a 99.99% catch rate. The system continuously adapts to natural
                  changes in your voice while maintaining its security guarantees through zero-knowledge proofs that
                  never expose raw biometric data.
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
            Security Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {securityFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-xl border-primary/20 overflow-visible"
                style={{ boxShadow: "0 0 15px hsl(187 100% 50% / 0.05)" }}
                data-testid={`card-security-item-${index}`}
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
                The Voice-Controlled Secure Core provides the authentication and command layer for the entire
                Luthor.Tech ecosystem, enabling hands-free interaction with all platform capabilities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/features/cefi-defi">
                  <div className="p-4 rounded-md hover-elevate cursor-pointer" style={{ background: "hsl(187 100% 50% / 0.03)", border: "1px solid hsl(187 100% 50% / 0.1)" }} data-testid="link-integration-cefi">
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-heading font-semibold text-sm">CeFi-DeFi Sync</p>
                        <p className="text-xs text-muted-foreground">Voice-authenticated transactions and portfolio commands</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 ml-auto" />
                    </div>
                  </div>
                </Link>
                <Link href="/features/ai-companion">
                  <div className="p-4 rounded-md hover-elevate cursor-pointer" style={{ background: "hsl(187 100% 50% / 0.03)", border: "1px solid hsl(187 100% 50% / 0.1)" }} data-testid="link-integration-ai">
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-heading font-semibold text-sm">AI Companion</p>
                        <p className="text-xs text-muted-foreground">Voice-activated AI assistant with biometric verification</p>
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
                Request Demo Access
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
