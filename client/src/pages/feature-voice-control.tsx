import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Mic, Shield, Fingerprint, Waves, Lock, Scan } from "lucide-react";

const securityFeatures = [
  {
    icon: Fingerprint,
    title: "Biometric Voiceprint",
    description: "Unique voice signature verification that's nearly impossible to replicate or spoof.",
  },
  {
    icon: Waves,
    title: "Real-time Processing",
    description: "Sub-100ms voice recognition with continuous anti-spoofing analysis.",
  },
  {
    icon: Shield,
    title: "Multi-Factor Auth",
    description: "Combine voice with other factors for enterprise-grade security layers.",
  },
  {
    icon: Lock,
    title: "Encrypted Channels",
    description: "End-to-end encryption for all voice data transmission and storage.",
  },
  {
    icon: Scan,
    title: "Liveness Detection",
    description: "Advanced AI detects recordings, deepfakes, and voice synthesis attempts.",
  },
];

export default function FeatureVoiceControl() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
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

            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/5">
              Security Innovation
            </Badge>

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
              Cutting-edge voice recognition technology with military-grade security for hands-free control.
              Your voice becomes the ultimate authentication key in the Luthor.Tech ecosystem.
            </p>
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
                  voice recognition to create an impenetrable security layer.
                </p>
                <p>
                  Our proprietary neural network analyzes over 100 unique vocal characteristics—from pitch and cadence
                  to micro-variations invisible to the human ear. This creates a voiceprint as unique as your fingerprint
                  but far more difficult to compromise.
                </p>
                <p>
                  Real-time liveness detection ensures that recordings, AI voice cloning, and other spoofing attempts
                  are instantly identified and blocked. The system continuously adapts to natural changes in your voice
                  while maintaining its security guarantees.
                </p>
              </div>
            </CardContent>
          </Card>

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
