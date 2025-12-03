import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Link href="/">
              <span
                className="font-display text-lg font-bold tracking-wider cursor-pointer"
                style={{
                  color: "hsl(187 100% 50%)",
                  textShadow: "0 0 10px hsl(187 100% 50% / 0.5)",
                }}
                data-testid="link-footer-logo"
              >
                RMLuthor.us
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 font-heading tracking-wide">
              The Luthor.Tech AI Ecosystem Core
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/projects">
              <span className="hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-projects">
                Projects
              </span>
            </Link>
            <Link href="/games">
              <span className="hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-games">
                Games
              </span>
            </Link>
            <Link href="/blog">
              <span className="hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-blog">
                Blog
              </span>
            </Link>
            <Link href="/contact">
              <span className="hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-contact">
                Contact
              </span>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground/70" data-testid="text-copyright">
            Luthor.Tech {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
