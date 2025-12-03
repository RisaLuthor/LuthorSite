export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 100% 50% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 100% 50% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center top",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 100% 50% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 100% 50% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center bottom",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center px-4">
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6 animate-float animate-text-glow-pulse"
          style={{
            color: "hsl(187 100% 50%)",
            textShadow: `
              0 0 10px hsl(187 100% 50%),
              0 0 20px hsl(187 100% 50%),
              0 0 40px hsl(187 100% 50%),
              0 0 80px hsl(187 100% 50% / 0.5),
              0 0 120px hsl(187 100% 50% / 0.3)
            `,
          }}
          data-testid="text-hero-title"
        >
          RMLUTHOR.US
        </h1>

        <div
          className="w-48 sm:w-64 md:w-96 h-0.5 mx-auto mb-6 animate-fade-in"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(187 100% 50%), transparent)",
            boxShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
            animationDelay: "0.3s",
          }}
        />

        <p
          className="font-heading text-lg sm:text-xl md:text-2xl tracking-widest uppercase animate-fade-in-up"
          style={{
            color: "hsl(187 100% 70%)",
            textShadow: "0 0 10px hsl(187 100% 50% / 0.5)",
            animationDelay: "0.5s",
          }}
          data-testid="text-hero-subtitle"
        >
          THE LUTHOR.TECH AI ECOSYSTEM CORE
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          style={{ boxShadow: "0 0 10px hsl(187 100% 50% / 0.3)" }}
        >
          <div
            className="w-1.5 h-3 rounded-full bg-primary animate-bounce"
            style={{ boxShadow: "0 0 5px hsl(187 100% 50%)" }}
          />
        </div>
      </div>
    </section>
  );
}
