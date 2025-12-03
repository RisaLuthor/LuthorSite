import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Shop from "@/pages/shop";
import Projects from "@/pages/projects";
import Games from "@/pages/games";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import FeatureCeFiDeFi from "@/pages/feature-cefi-defi";
import FeatureAICompanion from "@/pages/feature-ai-companion";
import FeatureVoiceControl from "@/pages/feature-voice-control";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/shop" component={Shop} />
      <Route path="/login" component={Login} />
      <Route path="/projects" component={Projects} />
      <Route path="/games" component={Games} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/features/cefi-defi" component={FeatureCeFiDeFi} />
      <Route path="/features/ai-companion" component={FeatureAICompanion} />
      <Route path="/features/voice-control" component={FeatureVoiceControl} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
