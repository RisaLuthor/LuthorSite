import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    id: "ai-evolution",
    title: "The Evolution of AI in the Luthor.Tech Ecosystem",
    excerpt: "Exploring how our AI systems have grown from simple automation to complex cognitive architectures capable of independent reasoning.",
    date: "2025-12-01",
    readTime: "8 min read",
    category: "AI Research",
  },
  {
    id: "cefi-defi-future",
    title: "Bridging CeFi and DeFi: A Technical Deep Dive",
    excerpt: "An in-depth look at the protocols and technologies enabling seamless interaction between centralized and decentralized finance.",
    date: "2025-11-28",
    readTime: "12 min read",
    category: "Blockchain",
  },
  {
    id: "voice-security",
    title: "Voice Authentication: The Future of Secure Access",
    excerpt: "How our voice-controlled secure core is revolutionizing authentication with military-grade biometric verification.",
    date: "2025-11-25",
    readTime: "6 min read",
    category: "Security",
  },
  {
    id: "quantum-ready",
    title: "Preparing for the Quantum Era",
    excerpt: "Our approach to post-quantum cryptography and ensuring all Luthor.Tech systems remain secure in a quantum computing world.",
    date: "2025-11-20",
    readTime: "10 min read",
    category: "Cryptography",
  },
];

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

          <div className="space-y-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group bg-card/50 backdrop-blur-xl border-primary/20 transition-all duration-300 hover:border-primary/40 cursor-pointer overflow-visible"
                style={{
                  boxShadow: "0 0 20px hsl(187 100% 50% / 0.05)",
                }}
                data-testid={`card-post-${post.id}`}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary/80 bg-primary/5 text-xs"
                    >
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h2
                    className="font-heading text-xl lg:text-2xl font-semibold tracking-wide mb-3 group-hover:text-primary transition-colors"
                    data-testid={`text-post-title-${post.id}`}
                  >
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-4" data-testid={`text-post-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
