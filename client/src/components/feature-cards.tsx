import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftRight, Bot, Mic } from "lucide-react";

const features = [
  {
    id: "cefi-defi",
    title: "CeFi ↔ DeFi Sync",
    description: "Seamlessly bridge centralized and decentralized finance ecosystems with intelligent synchronization protocols.",
    icon: ArrowLeftRight,
  },
  {
    id: "ai-companion",
    title: "AI Companion System",
    description: "Advanced artificial intelligence companion designed to assist, learn, and evolve with your digital journey.",
    icon: Bot,
  },
  {
    id: "voice-control",
    title: "Voice-Controlled Secure Core",
    description: "Cutting-edge voice recognition technology with military-grade security for hands-free control.",
    icon: Mic,
  },
];

export function FeatureCards() {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className="group relative overflow-visible bg-card/50 backdrop-blur-xl border-primary/20 transition-all duration-500 hover:-translate-y-1"
              style={{
                boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)",
              }}
              data-testid={`card-feature-${feature.id}`}
            >
              <div
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 0 30px hsl(187 100% 50% / 0.2), inset 0 0 20px hsl(187 100% 50% / 0.05)",
                }}
              />
              
              <CardContent className="p-6 lg:p-8 relative">
                <div
                  className="w-14 h-14 rounded-md flex items-center justify-center mb-6 transition-all duration-300"
                  style={{
                    background: "hsl(187 100% 50% / 0.1)",
                    border: "1px solid hsl(187 100% 50% / 0.3)",
                    boxShadow: "0 0 15px hsl(187 100% 50% / 0.2)",
                  }}
                >
                  <feature.icon
                    className="w-7 h-7"
                    style={{ color: "hsl(187 100% 50%)" }}
                  />
                </div>

                <h3
                  className="font-heading text-lg lg:text-xl font-semibold tracking-wide mb-3 transition-all duration-300"
                  style={{
                    color: "hsl(187 100% 70%)",
                  }}
                  data-testid={`text-feature-title-${feature.id}`}
                >
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-feature-desc-${feature.id}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
