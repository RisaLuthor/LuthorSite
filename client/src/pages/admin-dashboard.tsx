import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  Edit, 
  Cpu, 
  Printer, 
  Box, 
  Clock,
  Calendar,
  LogIn,
  Shield,
  AlertCircle,
  Send,
  HardDrive
} from "lucide-react";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";
import type { WorkUpdate, PrintingProject } from "@shared/schema";

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

function TodaysWorkSection() {
  const today = new Date();
  const timeMin = startOfDay(today).toISOString();
  const timeMax = endOfDay(today).toISOString();

  const { data: events = [], isLoading } = useQuery<CalendarEvent[]>({
    queryKey: ['/api/calendar/events', 'today', timeMin, timeMax],
    queryFn: () => fetch(`/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`).then(r => r.json()),
    refetchInterval: 60000,
  });

  const formatEventTime = (event: CalendarEvent) => {
    const startTime = event.start?.dateTime;
    const endTime = event.end?.dateTime;
    
    if (startTime && endTime) {
      return `${format(new Date(startTime), 'h:mm a')} - ${format(new Date(endTime), 'h:mm a')}`;
    }
    return 'All day';
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            Today's Schedule
          </CardTitle>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          {format(today, 'EEEE, MMM d')}
        </Badge>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-6 text-muted-foreground">Loading schedule...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p>No events scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map(event => (
              <div 
                key={event.id} 
                className="p-3 rounded-lg bg-background/50 border border-primary/20"
                data-testid={`card-today-event-${event.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-1 h-full min-h-[40px] bg-primary rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold truncate" style={{ color: "hsl(187 100% 50%)" }}>
                      {event.summary}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{formatEventTime(event)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Box className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                    {event.description && (
                      <p className="mt-2 text-sm text-foreground/70 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function WorkUpdatesManager() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>("general");
  const { toast } = useToast();

  const { data: updates = [], isLoading } = useQuery<WorkUpdate[]>({
    queryKey: ['/api/blog/updates'],
  });

  const createUpdate = useMutation({
    mutationFn: (data: { title: string; content: string; category: string }) =>
      apiRequest('POST', '/api/blog/updates', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/updates'] });
      setTitle("");
      setContent("");
      setCategory("general");
      toast({ title: "Update posted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to post update", variant: "destructive" });
    },
  });

  const deleteUpdate = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/blog/updates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/updates'] });
      toast({ title: "Update deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete update", variant: "destructive" });
    },
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'development': return <Cpu className="w-3 h-3" />;
      case '3d-printing': return <Printer className="w-3 h-3" />;
      case 'ai': return <Box className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case '3d-printing': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'ai': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Edit className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            Work Updates
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Post New Update</h3>
          <Input
            placeholder="Update title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background/50 border-primary/20 focus:border-primary"
            data-testid="input-admin-update-title"
          />
          <Textarea
            placeholder="What are you working on?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-background/50 border-primary/20 focus:border-primary min-h-[100px]"
            data-testid="input-admin-update-content"
          />
          <div className="flex gap-2 flex-wrap">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[160px] bg-background/50 border-primary/20" data-testid="select-admin-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="3d-printing">3D Printing</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => createUpdate.mutate({ title, content, category })}
              disabled={!title.trim() || !content.trim() || createUpdate.isPending}
              className="gap-2"
              data-testid="button-admin-post-update"
            >
              <Send className="w-4 h-4" />
              Post Update
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Recent Updates</h3>
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading updates...</div>
          ) : updates.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No updates yet. Post your first one above!</div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {updates.map((update) => (
                <div 
                  key={update.id} 
                  className="p-3 rounded-lg bg-background/30 border border-primary/10"
                  data-testid={`card-admin-update-${update.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-heading font-semibold text-sm">{update.title}</h4>
                        <Badge className={`${getCategoryColor(update.category || 'general')} gap-1`}>
                          {getCategoryIcon(update.category || 'general')}
                          {update.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{update.content}</p>
                      <span className="text-xs text-muted-foreground/60 mt-1 block">
                        {update.createdAt && format(new Date(update.createdAt), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0 text-destructive hover:text-destructive"
                      onClick={() => deleteUpdate.mutate(update.id)}
                      disabled={deleteUpdate.isPending}
                      data-testid={`button-delete-update-${update.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function PrintingProjectsManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("custom");
  const [status, setStatus] = useState<string>("available");
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery<PrintingProject[]>({
    queryKey: ['/api/blog/printing-projects'],
  });

  const createProject = useMutation({
    mutationFn: (data: { title: string; description: string; category: string; status: string }) =>
      apiRequest('POST', '/api/blog/printing-projects', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/printing-projects'] });
      setTitle("");
      setDescription("");
      setCategory("custom");
      setStatus("available");
      toast({ title: "Project added!" });
    },
    onError: () => {
      toast({ title: "Failed to add project", variant: "destructive" });
    },
  });

  const deleteProject = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/blog/printing-projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/printing-projects'] });
      toast({ title: "Project deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete project", variant: "destructive" });
    },
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'coming-soon': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'custom-order': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Printer className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            3D Printing Projects
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Add New Project</h3>
          <Input
            placeholder="Project title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background/50 border-primary/20 focus:border-primary"
            data-testid="input-admin-project-title"
          />
          <Textarea
            placeholder="Project description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-background/50 border-primary/20 focus:border-primary min-h-[80px]"
            data-testid="input-admin-project-description"
          />
          <div className="flex gap-2 flex-wrap">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px] bg-background/50 border-primary/20" data-testid="select-admin-project-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nas-case">NAS Case</SelectItem>
                <SelectItem value="server-case">Server Case</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px] bg-background/50 border-primary/20" data-testid="select-admin-project-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="coming-soon">Coming Soon</SelectItem>
                <SelectItem value="custom-order">Custom Order</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => createProject.mutate({ title, description, category, status })}
              disabled={!title.trim() || !description.trim() || createProject.isPending}
              className="gap-2"
              data-testid="button-admin-add-project"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Current Projects</h3>
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No projects yet</div>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="p-3 rounded-lg bg-background/30 border border-primary/10"
                  data-testid={`card-admin-project-${project.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <HardDrive className="w-4 h-4 text-primary shrink-0" />
                        <h4 className="font-heading font-semibold text-sm">{project.title}</h4>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status?.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0 text-destructive hover:text-destructive"
                      onClick={() => deleteProject.mutate(project.id)}
                      disabled={deleteProject.isPending}
                      data-testid={`button-delete-project-${project.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const { data: adminCheck, isLoading: adminLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ['/api/auth/is-admin'],
    queryFn: () => fetch('/api/auth/is-admin').then(r => r.json()),
    enabled: isAuthenticated,
  });

  const isAdmin = adminCheck?.isAdmin ?? false;
  const isLoading = authLoading || adminLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="animate-pulse">
                <LayoutDashboard className="w-16 h-16 mx-auto mb-4 text-primary/30" />
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <LogIn className="w-16 h-16 mx-auto mb-4 text-primary/50" />
              <h1 
                className="font-display text-2xl font-bold tracking-wider mb-4"
                style={{ color: "hsl(187 100% 50%)" }}
              >
                Login Required
              </h1>
              <p className="text-muted-foreground mb-6">
                Please log in with Replit to access the admin dashboard.
              </p>
              <Link href="/login">
                <Button className="gap-2" data-testid="button-login-redirect">
                  <LogIn className="w-4 h-4" />
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <Shield className="w-16 h-16 mx-auto mb-4 text-yellow-500/50" />
              <h1 
                className="font-display text-2xl font-bold tracking-wider mb-4"
                style={{ color: "hsl(45 100% 50%)" }}
              >
                Access Restricted
              </h1>
              <p className="text-muted-foreground mb-2">
                You're logged in as: <span className="text-foreground font-semibold">{user?.email}</span>
              </p>
              <p className="text-muted-foreground">
                This dashboard is only available to the site administrator.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1
                className="font-display text-3xl sm:text-4xl font-bold tracking-wider"
                style={{
                  color: "hsl(187 100% 50%)",
                  textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
                }}
                data-testid="text-admin-title"
              >
                Admin Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground font-heading tracking-wide">
              Welcome back, {user?.firstName || 'Admin'}! Manage your blog content here.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <TodaysWorkSection />
              <PrintingProjectsManager />
            </div>
            <div className="space-y-6">
              <WorkUpdatesManager />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
