import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Shield, LogIn, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated, isLoading, login, isLoggingIn } = useAdminAuth();
  const [, navigate] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    navigate("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      await login({ email: email.trim(), password });
      navigate("/admin/dashboard");
    } catch (err: any) {
      const msg = err?.message || "Login failed";
      if (msg.includes("401")) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 100% 50% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 100% 50% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1
            className="font-display text-2xl font-bold tracking-wider mb-2"
            style={{
              color: "hsl(187 100% 50%)",
              textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
            }}
            data-testid="text-admin-login-title"
          >
            ADMIN ACCESS
          </h1>
          <p className="text-sm text-muted-foreground font-heading tracking-wide">
            Luthor.Tech Control Plane
          </p>
        </div>

        <Card
          className="bg-card/50 backdrop-blur-xl border-primary/20"
          style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}
        >
          <CardHeader>
            <CardTitle className="font-heading text-lg tracking-wide text-center">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive"
                  data-testid="text-login-error"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-heading text-muted-foreground" htmlFor="admin-email">
                  Email
                </label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-primary/20 focus:border-primary"
                  autoComplete="email"
                  data-testid="input-admin-email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-heading text-muted-foreground" htmlFor="admin-password">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 border-primary/20 focus:border-primary pr-10"
                    autoComplete="current-password"
                    data-testid="input-admin-password"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isLoggingIn || !email.trim() || !password.trim()}
                data-testid="button-admin-login"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {isLoggingIn ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6 font-heading tracking-wide">
          Protected system access only
        </p>
      </div>
    </div>
  );
}
