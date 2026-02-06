import { Switch, Route, Redirect } from "wouter";
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
import ProjectHolofans from "@/pages/project-holofans";
import ProjectErpDashboard from "@/pages/project-erp-dashboard";
import PixelArcArchive from "@/pages/pixelarc-archive";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminProjects from "@/pages/admin-projects";
import AdminModules from "@/pages/admin-modules";
import AdminSettings from "@/pages/admin-settings";
import Labs from "@/pages/labs";
import { LabKieranCore, LabSentinel, LabMnemosyne, LabAether, LabEthica } from "@/pages/lab-system-brief";
import NotFound from "@/pages/not-found";

function AdminRedirect() {
  return <Redirect to="/admin/dashboard" />;
}

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
      <Route path="/projects/holofans" component={ProjectHolofans} />
      <Route path="/projects/holofans/archive" component={PixelArcArchive} />
      <Route path="/projects/erp-dashboard" component={ProjectErpDashboard} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/projects" component={AdminProjects} />
      <Route path="/admin/modules" component={AdminModules} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin" component={AdminRedirect} />
      <Route path="/labs" component={Labs} />
      <Route path="/labs/kieran-core" component={LabKieranCore} />
      <Route path="/labs/sentinel" component={LabSentinel} />
      <Route path="/labs/mnemosyne" component={LabMnemosyne} />
      <Route path="/labs/aether" component={LabAether} />
      <Route path="/labs/ethica" component={LabEthica} />
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
