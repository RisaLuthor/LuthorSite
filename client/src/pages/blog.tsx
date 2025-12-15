import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Sparkles } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-4"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-blog-title"
            >
              Blog
            </h1>
            <p className="text-muted-foreground font-heading tracking-wide max-w-2xl mx-auto" data-testid="text-blog-subtitle">
              Insights, updates, and deep dives from the Luthor.Tech team
            </p>
          </div>

          <Card
            className="bg-card/50 backdrop-blur-xl border-primary/20 overflow-hidden"
            style={{
              boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)",
            }}
          >
            <CardContent className="p-12 lg:p-16">
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
                  style={{ 
                    background: "hsl(187 100% 50% / 0.1)", 
                    border: "2px solid hsl(187 100% 50% / 0.3)",
                    boxShadow: "0 0 40px hsl(187 100% 50% / 0.2)"
                  }}
                >
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                
                <h2 
                  className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-4"
                  style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
                >
                  Coming Soon
                </h2>
                
                <p className="text-muted-foreground text-lg max-w-md mb-8">
                  I'm working on exciting new content about AI, technology, and innovation. 
                  Check back soon for articles, tutorials, and insights from the Luthor.Tech ecosystem.
                </p>

                <div className="flex items-center gap-2 text-primary/80">
                  <Clock className="w-5 h-5" />
                  <span className="font-heading tracking-wide">Stay tuned for updates</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
