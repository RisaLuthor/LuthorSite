import { useLocation, Link, Redirect } from "wouter";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  Shield,
  LogOut,
  Loader2,
} from "lucide-react";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { id: "projects", label: "Projects", icon: Briefcase, href: "/admin/projects" },
  { id: "modules", label: "Modules", icon: FileText, href: "/admin/modules" },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
];

function getSectionFromPath(path: string): string {
  const segment = path.replace("/admin/", "").replace("/admin", "");
  const match = sidebarItems.find((item) => item.id === segment);
  return match ? match.id : "dashboard";
}

const sectionTitles: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Portfolio Management",
  modules: "Content Modules",
  settings: "Settings",
};

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isAuthenticated, email, isLoading, logout, isLoggingOut } = useAdminAuth();
  const [, navigate] = useLocation();
  const activeSection = getSectionFromPath(location);

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

  if (!isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card/30 backdrop-blur-xl border-r border-primary/20 p-4 sticky top-0">
          <div className="mb-2 p-3">
            <h2
              className="font-display text-lg font-bold tracking-wider"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 8px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-admin-brand"
            >
              LUTHOR.TECH
            </h2>
            <p className="text-xs text-muted-foreground font-heading mt-1">Control Plane</p>
          </div>

          <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-heading text-primary">Admin</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 truncate">{email}</p>
          </div>

          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <a
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  }`}
                  data-testid={`link-admin-nav-${item.id}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-heading">{item.label}</span>
                </a>
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-primary/10">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground"
              onClick={handleLogout}
              disabled={isLoggingOut}
              data-testid="button-admin-logout"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-primary/10 px-4 sm:px-6 lg:px-8 py-4">
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 mb-3">
              {sidebarItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={activeSection === item.id ? "default" : "outline"}
                    size="sm"
                    className="gap-2 shrink-0"
                    data-testid={`button-admin-mobile-nav-${item.id}`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="gap-2 shrink-0 text-muted-foreground"
                onClick={handleLogout}
                disabled={isLoggingOut}
                data-testid="button-admin-mobile-logout"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
            <div>
              <h1
                className="font-display text-2xl sm:text-3xl font-bold tracking-wider"
                style={{
                  color: "hsl(187 100% 50%)",
                  textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
                }}
                data-testid="text-admin-title"
              >
                {sectionTitles[activeSection] || "Dashboard"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs border-primary/30 text-muted-foreground">
                  {email}
                </Badge>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
