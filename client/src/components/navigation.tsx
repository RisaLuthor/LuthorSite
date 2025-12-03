import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Games", href: "/games" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/">
            <span
              className="font-display text-xl lg:text-2xl font-bold tracking-wider text-primary cursor-pointer"
              style={{
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="link-logo"
            >
              RMLuthor.us
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`px-3 py-2 text-sm font-heading font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={
                    location === item.href
                      ? { textShadow: "0 0 10px hsl(187 100% 50% / 0.6)" }
                      : {}
                  }
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              className="font-heading tracking-wide border-primary/50 text-primary hover:border-primary hover:bg-primary/10"
              style={{
                boxShadow: "0 0 10px hsl(187 100% 50% / 0.2)",
              }}
              data-testid="button-login"
            >
              Login
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`block px-3 py-2 font-heading font-medium tracking-wide cursor-pointer ${
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <div className="flex items-center justify-between mt-4 gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                className="flex-1 font-heading tracking-wide border-primary/50 text-primary"
                data-testid="button-mobile-login"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
