import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowLeftRight, Shield, Zap, Globe, Lock, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Security",
    description: "Every transaction is protected by multi-layered encryption and real-time threat monitoring.",
  },
  {
    icon: Zap,
    title: "Instant Synchronization",
    description: "Near-instantaneous bridging between CeFi and DeFi ecosystems with minimal latency.",
  },
  {
    icon: Globe,
    title: "Global Compatibility",
    description: "Works seamlessly with major centralized exchanges and decentralized protocols worldwide.",
  },
  {
    icon: Lock,
    title: "Non-Custodial Architecture",
    description: "Your assets remain under your control throughout the entire bridging process.",
  },
  {
    icon: RefreshCw,
    title: "Smart Rebalancing",
    description: "AI-powered portfolio optimization across CeFi and DeFi positions for maximum efficiency.",
  },
];

export default function FeatureCeFiDeFi() {
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
              <ArrowLeftRight className="w-10 h-10 text-primary" />
            </div>

            <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/5">
              Core Technology
            </Badge>

            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-6"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-feature-title"
            >
              CeFi ↔ DeFi Sync
            </h1>

            <p className="text-muted-foreground font-heading tracking-wide max-w-3xl mx-auto text-lg leading-relaxed" data-testid="text-feature-description">
              Seamlessly bridge centralized and decentralized finance ecosystems with intelligent synchronization protocols.
              Our revolutionary technology eliminates the friction between traditional and blockchain-based financial systems.
            </p>
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
                  Our proprietary liquidity aggregation engine ensures the best execution prices by scanning multiple venues
                  in milliseconds. Whether you're moving assets from Coinbase to Uniswap or rebalancing between Binance and
                  Aave, the Sync protocol handles the complexity invisibly.
                </p>
                <p>
                  All operations are fully auditable on-chain while maintaining privacy through zero-knowledge proofs.
                  This hybrid approach combines the regulatory compliance of CeFi with the transparency and innovation of DeFi.
                </p>
              </div>
            </CardContent>
          </Card>

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

          <div className="text-center">
            <Link href="/contact">
              <Button
                className="px-8"
                style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.3)" }}
                data-testid="button-contact-cta"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
