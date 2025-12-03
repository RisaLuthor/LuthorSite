import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProfileSection } from "@/components/profile-section";
import { FeatureCards } from "@/components/feature-cards";
import { ChatInterface } from "@/components/chat-interface";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ProfileSection />
        <FeatureCards />
        <ChatInterface />
      </main>
      <Footer />
    </div>
  );
}
