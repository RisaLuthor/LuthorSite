import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export function ProfileSection() {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-xl animate-pulse-glow"
              style={{
                background: "hsl(187 100% 50% / 0.2)",
                transform: "scale(1.1)",
              }}
            />
            <Avatar
              className="w-32 h-32 lg:w-48 lg:h-48 border-2 relative"
              style={{
                borderColor: "hsl(187 100% 50% / 0.5)",
                boxShadow: "0 0 20px hsl(187 100% 50% / 0.3), 0 0 40px hsl(187 100% 50% / 0.2)",
              }}
            >
              <AvatarFallback className="bg-card text-primary text-4xl lg:text-6xl font-display">
                <User className="w-16 h-16 lg:w-24 lg:h-24 text-primary/70" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="text-center lg:text-left flex-1">
            <p className="text-muted-foreground font-heading tracking-wider uppercase mb-2" data-testid="text-profile-label">
              Kiearan Hologrem
            </p>
            
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-4"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-profile-name"
            >
              RMLuthor.us
            </h2>

            <p
              className="font-heading text-lg lg:text-xl text-foreground/90 tracking-wide max-w-2xl"
              data-testid="text-profile-tagline"
            >
              AI architecture. Security innovations. The embodiment of Kiearan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
