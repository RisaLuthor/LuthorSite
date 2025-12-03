import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, User, LogIn, ArrowRight, Shield, Zap, Bot } from "lucide-react";
import { Link } from "wouter";

export default function Login() {
  const [selectedType, setSelectedType] = useState<"personal" | "enterprise" | null>(null);

  const handleLogin = () => {
    if (selectedType) {
      localStorage.setItem("pendingUserType", selectedType);
      window.location.href = "/api/login";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 100% 50% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 100% 50% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <Link href="/">
            <h1
              className="font-display text-3xl md:text-4xl font-bold tracking-wider mb-2 cursor-pointer inline-block"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50% / 0.5)",
              }}
            >
              RMLUTHOR.US
            </h1>
          </Link>
          <p className="text-muted-foreground font-heading">Access the Luthor.Tech AI Ecosystem</p>
        </div>

        <Card
          className="bg-card/80 backdrop-blur-xl border-primary/20"
          style={{
            boxShadow: "0 0 40px hsl(187 100% 50% / 0.1)",
          }}
        >
          <CardHeader className="text-center border-b border-border/50 pb-6">
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "hsl(187 100% 50% / 0.1)",
                  border: "2px solid hsl(187 100% 50% / 0.3)",
                  boxShadow: "0 0 20px hsl(187 100% 50% / 0.2)",
                }}
              >
                <Bot className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2
              className="font-heading text-xl font-semibold"
              style={{ color: "hsl(187 100% 70%)" }}
            >
              Welcome to Kiearan
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Select your account type to personalize your experience
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">How will you be using our platform?</p>
              
              <button
                onClick={() => setSelectedType("personal")}
                className={`w-full flex items-start gap-4 p-4 rounded-md transition-all text-left ${
                  selectedType === "personal"
                    ? "bg-primary/20 border-2 border-primary/50"
                    : "bg-muted/20 border-2 border-border/30 hover:border-primary/30"
                }`}
                data-testid="button-select-personal"
              >
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center shrink-0 ${
                    selectedType === "personal" ? "bg-primary/20" : "bg-muted/30"
                  }`}
                >
                  <User className={`w-6 h-6 ${selectedType === "personal" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold mb-1 ${selectedType === "personal" ? "text-primary" : "text-foreground"}`}>
                    Personal User
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For individuals exploring AI technology, learning, and personal projects
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Casual conversation
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Free tier access
                    </span>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedType("enterprise")}
                className={`w-full flex items-start gap-4 p-4 rounded-md transition-all text-left ${
                  selectedType === "enterprise"
                    ? "bg-primary/20 border-2 border-primary/50"
                    : "bg-muted/20 border-2 border-border/30 hover:border-primary/30"
                }`}
                data-testid="button-select-enterprise"
              >
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center shrink-0 ${
                    selectedType === "enterprise" ? "bg-primary/20" : "bg-muted/30"
                  }`}
                >
                  <Building2 className={`w-6 h-6 ${selectedType === "enterprise" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold mb-1 ${selectedType === "enterprise" ? "text-primary" : "text-foreground"}`}>
                    Enterprise User
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For businesses seeking professional AI solutions with technical support
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Technical responses
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Priority support
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!selectedType}
              className="w-full"
              size="lg"
              style={{
                boxShadow: selectedType ? "0 0 20px hsl(187 100% 50% / 0.3)" : "none",
              }}
              data-testid="button-continue-login"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Continue to Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy.
              <br />
              You can change your account type anytime in settings.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/">
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Continue without logging in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
