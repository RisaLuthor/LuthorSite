import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  ExternalLink,
  Store,
  Package,
  Star,
  ArrowRight,
  Disc3,
  MessageSquare,
  Mic,
  Image,
} from "lucide-react";
import { SiEtsy, SiAmazon } from "react-icons/si";
import { Link } from "wouter";

const shopSections = [
  {
    platform: "Etsy",
    icon: SiEtsy,
    url: "https://luthortech.etsy.com/",
    description: "Explore unique digital products, templates, and tech-inspired merchandise at my Etsy shop.",
    buttonText: "Visit Etsy Shop",
    color: "hsl(14 100% 53%)",
    items: [
      "Digital Templates",
      "Tech Merchandise",
      "AI-Themed Products",
      "Custom Designs",
    ],
  },
  {
    platform: "Amazon",
    icon: SiAmazon,
    url: "https://www.amazon.com/stores/Risa-Luthor/author/B0DJF5RYL7?ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true",
    description: "Browse my published books on technology, AI, programming, and more on Amazon.",
    buttonText: "View Books on Amazon",
    color: "hsl(35 100% 50%)",
    items: [
      "Technology Books",
      "AI & Machine Learning Guides",
      "Programming Resources",
      "Career Development",
    ],
  },
];

const featuredProducts = [
  {
    title: "MP4 Holographic Display Fans",
    category: "Hardware",
    platform: "Luthor.Tech",
    description: "Create stunning 3D holographic displays with our MP4 display fan products. Perfect for business, entertainment, or personal use.",
    badge: "Featured",
    icon: Disc3,
    link: "/projects/holofans",
  },
  {
    title: "Hologram Templates",
    category: "Digital Content",
    platform: "Luthor.Tech",
    description: "700+ ready-to-use hologram templates including Star Wars, TV shows, animals, and more. Download and display instantly.",
    badge: "New",
    icon: Image,
    link: "/projects/holofans",
  },
  {
    title: "Custom Messages & Text",
    category: "Digital Content",
    platform: "Luthor.Tech",
    description: "Create personalized holographic messages for events, promotions, or special occasions with custom text and animations.",
    badge: "Popular",
    icon: MessageSquare,
    link: "/projects/holofans",
  },
  {
    title: "Voice Recording Holograms",
    category: "Digital Content",
    platform: "Luthor.Tech",
    description: "Add voice recordings to your holograms for interactive displays. Perfect for greetings, announcements, and presentations.",
    badge: "Coming Soon",
    icon: Mic,
    link: "/projects/holofans",
  },
  {
    title: "AI Development Guide",
    category: "E-Book",
    platform: "Amazon",
    description: "Comprehensive guide to building AI-powered applications from concept to deployment.",
    badge: "New Release",
    icon: null,
    link: null,
  },
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 
                className="font-display text-3xl lg:text-4xl font-bold tracking-wider mb-4"
                style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 20px hsl(187 100% 50% / 0.5)" }}
                data-testid="text-shop-title"
              >
                Shop
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover holographic display products, digital templates, published books, and tech merchandise. 
                From MP4 display fans to AI guides, find resources to fuel your tech journey.
              </p>
            </div>

            <Card 
              className="bg-card/80 border-primary/30 overflow-hidden mb-16"
              style={{ boxShadow: "0 0 40px hsl(187 100% 50% / 0.15)" }}
            >
              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <Badge className="bg-primary/20 text-primary border-0 mb-4">
                      Featured Product
                    </Badge>
                    <h2 
                      className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-4"
                      style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
                    >
                      MP4 Holographic Display Fans
                    </h2>
                    <p className="text-muted-foreground max-w-xl mb-4">
                      Create mesmerizing 3D holographic displays with our collection of MP4 display fan products, 
                      templates, and content. Browse 700+ ready-to-use holograms or create your own custom designs.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        700+ Templates
                      </Badge>
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        Custom Messages
                      </Badge>
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        Voice Recordings
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link href="/projects/holofans">
                      <Button 
                        size="lg"
                        className="bg-primary text-primary-foreground"
                        style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.4)" }}
                        data-testid="button-shop-holofans"
                      >
                        <Disc3 className="w-5 h-5 mr-2" />
                        Browse Holograms
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {shopSections.map((section, index) => (
                <Card 
                  key={index}
                  className="bg-card/80 border-primary/20 overflow-hidden hover-elevate"
                  style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}
                  data-testid={`card-shop-${section.platform.toLowerCase()}`}
                >
                  <CardHeader 
                    className="pb-4"
                    style={{ 
                      borderBottom: `2px solid ${section.color}`,
                      background: `linear-gradient(135deg, ${section.color}10, transparent)`
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-16 h-16 rounded-md flex items-center justify-center"
                        style={{ 
                          background: `${section.color}20`,
                          border: `1px solid ${section.color}50`
                        }}
                      >
                        <section.icon 
                          className="w-8 h-8" 
                          style={{ color: section.color }}
                        />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold">{section.platform}</h2>
                        <Badge 
                          variant="outline" 
                          className="mt-1"
                          style={{ borderColor: `${section.color}50`, color: section.color }}
                        >
                          <Store className="w-3 h-3 mr-1" />
                          Official Store
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-6">{section.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Available Products:</h4>
                      <div className="flex flex-wrap gap-2">
                        {section.items.map((item, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="border-border/50 text-muted-foreground"
                          >
                            <Package className="w-3 h-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <a 
                      href={section.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        className="w-full"
                        style={{ 
                          background: section.color,
                          boxShadow: `0 0 20px ${section.color}40`
                        }}
                        data-testid={`button-visit-${section.platform.toLowerCase()}`}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {section.buttonText}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 
                  className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-4"
                  style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
                >
                  Featured Products
                </h2>
                <p className="text-muted-foreground">
                  Popular picks from my collection of holographic content and digital products
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product, index) => (
                  <Card 
                    key={index}
                    className="bg-card/80 border-primary/20 hover-elevate"
                    style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.05)" }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                          {product.category}
                        </Badge>
                        <Badge 
                          className="bg-primary/20 text-primary border-0 text-xs"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {product.badge}
                        </Badge>
                      </div>
                      <div 
                        className="w-full h-32 rounded-md mb-4 flex items-center justify-center"
                        style={{ 
                          background: "linear-gradient(135deg, hsl(187 100% 50% / 0.1), hsl(220 100% 50% / 0.1))",
                          border: "1px solid hsl(187 100% 50% / 0.2)"
                        }}
                      >
                        {product.icon ? (
                          <product.icon className="w-12 h-12 text-primary/50" />
                        ) : (
                          <ShoppingBag className="w-12 h-12 text-primary/50" />
                        )}
                      </div>
                      <h3 className="font-heading font-semibold mb-2">{product.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {product.platform}
                        </Badge>
                        {product.link ? (
                          <Link href={product.link}>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                              View Details
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card 
              className="bg-card/80 border-primary/30 overflow-hidden"
              style={{ boxShadow: "0 0 40px hsl(187 100% 50% / 0.1)" }}
            >
              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <h2 
                      className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-4"
                      style={{ color: "hsl(187 100% 50%)", textShadow: "0 0 10px hsl(187 100% 50% / 0.5)" }}
                    >
                      Want Something Custom?
                    </h2>
                    <p className="text-muted-foreground max-w-xl">
                      Looking for personalized holograms, custom development, or bulk orders? 
                      Let's discuss how I can help with your specific needs.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="/contact">
                      <Button 
                        size="lg"
                        className="bg-primary text-primary-foreground"
                        style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.4)" }}
                        data-testid="button-contact-custom"
                      >
                        Contact Me
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="py-8 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span
                className="font-display text-lg font-bold tracking-wider text-primary"
                style={{ textShadow: "0 0 10px hsl(187 100% 50%)" }}
              >
                RMLuthor.us
              </span>
              <p className="text-sm text-muted-foreground">
                The Luthor.Tech AI Ecosystem Core
              </p>
              <p className="text-sm text-muted-foreground">
                Luthor.Tech 2025
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
