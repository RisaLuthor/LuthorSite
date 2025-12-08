import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Play, Star, BookOpen } from "lucide-react";

const games = [
  {
    id: "cyber-quest",
    title: "Cyber Quest",
    description: "Navigate through a dystopian cyberpunk world as you uncover the secrets of the Luthor.Tech corporation.",
    genre: "Action RPG",
    rating: 4.8,
    status: "Available",
  },
  {
    id: "neural-nexus",
    title: "Neural Nexus",
    description: "A puzzle game that challenges your cognitive abilities while training you in AI-assisted problem solving.",
    genre: "Puzzle",
    rating: 4.5,
    status: "Available",
  },
  {
    id: "quantum-realms",
    title: "Quantum Realms",
    description: "Explore infinite parallel dimensions in this procedurally generated exploration adventure.",
    genre: "Adventure",
    rating: 4.7,
    status: "Coming Soon",
  },
  {
    id: "galactic-library",
    title: "Galactic Library",
    description: "Collect classic books from across the cosmos and discover unique details, hidden facts, and literary treasures. Build your ultimate library collection while learning fascinating insights about literature's greatest works.",
    genre: "Collection",
    rating: 4.6,
    status: "Available",
    icon: BookOpen,
  },
];

export default function Games() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-4"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-games-title"
            >
              Games
            </h1>
            <p className="text-muted-foreground font-heading tracking-wide max-w-2xl mx-auto" data-testid="text-games-subtitle">
              Immersive gaming experiences from the Luthor.Tech universe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {games.map((game) => (
              <Card
                key={game.id}
                className="group bg-card/50 backdrop-blur-xl border-primary/20 transition-all duration-500 hover:-translate-y-1 overflow-visible"
                style={{
                  boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)",
                }}
                data-testid={`card-game-${game.id}`}
              >
                <CardContent className="p-6">
                  <div
                    className="aspect-video rounded-md mb-4 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, hsl(200 25% 12%) 0%, hsl(200 25% 8%) 100%)",
                      border: "1px solid hsl(187 100% 50% / 0.2)",
                    }}
                  >
                    {game.icon ? (
                      <game.icon className="w-12 h-12 text-primary/40" />
                    ) : (
                      <Gamepad2 className="w-12 h-12 text-primary/40" />
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary/80 bg-primary/5 text-xs"
                    >
                      {game.genre}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-muted-foreground">{game.rating}</span>
                    </div>
                  </div>

                  <h3
                    className="font-heading text-lg font-semibold tracking-wide mb-2"
                    style={{ color: "hsl(187 100% 70%)" }}
                    data-testid={`text-game-title-${game.id}`}
                  >
                    {game.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4" data-testid={`text-game-desc-${game.id}`}>
                    {game.description}
                  </p>

                  <Button
                    className={`w-full ${
                      game.status === "Coming Soon"
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : ""
                    }`}
                    disabled={game.status === "Coming Soon"}
                    data-testid={`button-play-${game.id}`}
                  >
                    {game.status === "Coming Soon" ? (
                      "Coming Soon"
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Play Now
                      </>
                    )}
                  </Button>
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
