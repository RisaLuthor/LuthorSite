import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  Shield,
  Server,
  Database,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function AdminSettings() {
  const { email } = useAdminAuth();

  return (
    <AdminLayout>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          className="bg-card/50 backdrop-blur-xl border-primary/20"
          style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <CardTitle
                className="font-display tracking-wider"
                style={{ color: "hsl(187 100% 50%)" }}
              >
                Authentication
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Admin Email</span>
                <span className="text-sm font-heading" data-testid="text-settings-email">
                  {email}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Auth Method</span>
                <Badge variant="outline" className="text-xs">Session-based</Badge>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Session Status</span>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm text-green-400">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-card/50 backdrop-blur-xl border-primary/20"
          style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <Server className="w-6 h-6 text-primary" />
              <CardTitle
                className="font-display tracking-wider"
                style={{ color: "hsl(187 100% 50%)" }}
              >
                System Status
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Environment</span>
                <Badge variant="outline" className="text-xs">
                  {import.meta.env.MODE || "development"}
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Database</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm text-green-400">Connected</span>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">SSL / TLS</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm text-green-400">Enabled</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-card/50 backdrop-blur-xl border-primary/20 lg:col-span-2"
          style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-primary" />
              <CardTitle
                className="font-display tracking-wider"
                style={{ color: "hsl(187 100% 50%)" }}
              >
                Security Configuration
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "ADMIN_EMAIL", status: "configured" },
                { label: "ADMIN_PASSWORD", status: "configured" },
                { label: "SESSION_SECRET", status: "configured" },
                { label: "DATABASE_URL", status: "configured" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-2 p-3 rounded-lg bg-background/50 border border-primary/10"
                >
                  <code className="text-xs font-mono text-muted-foreground">{item.label}</code>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-xs text-green-400">Set</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
