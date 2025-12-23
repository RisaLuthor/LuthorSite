import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, LogIn, LogOut, User, Building2 } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skill Sets", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Projects", href: "/projects" },
  { label: "Games", href: "/games" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

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
            
            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full border border-primary/30"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-9 w-9">
                      {user.profileImageUrl && (
                        <AvatarImage src={user.profileImageUrl} alt={user.firstName || "User"} />
                      )}
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {user.userType === "enterprise" ? (
                          <>
                            <Building2 className="w-3 h-3 text-primary" />
                            <span className="text-xs text-primary">Enterprise</span>
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Personal</span>
                          </>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a
                      href="/api/logout"
                      className="flex items-center gap-2 cursor-pointer"
                      data-testid="button-logout"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="font-heading tracking-wide border-primary/50 text-primary hover:border-primary hover:bg-primary/10"
                  style={{
                    boxShadow: "0 0 10px hsl(187 100% 50% / 0.2)",
                  }}
                  data-testid="button-login"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
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
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2 flex-1">
                  <Avatar className="h-8 w-8">
                    {user.profileImageUrl && (
                      <AvatarImage src={user.profileImageUrl} alt={user.firstName || "User"} />
                    )}
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <a
                    href="/api/logout"
                    className="flex-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full font-heading tracking-wide border-primary/50 text-primary"
                      data-testid="button-mobile-logout"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </Button>
                  </a>
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="flex-1 font-heading tracking-wide border-primary/50 text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-mobile-login"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
