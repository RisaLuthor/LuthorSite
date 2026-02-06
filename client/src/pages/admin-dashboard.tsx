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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
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
  Send,
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  Activity,
  Briefcase,
  Loader2
} from "lucide-react";
import { format, startOfDay, endOfDay, subDays } from "date-fns";
import type { WorkUpdate, PrintingProject, Project, Service, CaseStudy } from "@shared/schema";

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

type AdminSection = "dashboard" | "content" | "portfolio" | "analytics";

const sidebarItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "content" as const, label: "Content", icon: FileText },
  { id: "portfolio" as const, label: "Portfolio", icon: Briefcase },
  { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
];

const mockVisitorData = Array.from({ length: 31 }, (_, i) => ({
  date: format(subDays(new Date(), 30 - i), 'MMM d'),
  visits: Math.floor(Math.random() * 50) + 10,
  pageViews: Math.floor(Math.random() * 100) + 20,
}));

function VisitorOverview() {
  const totalVisits = mockVisitorData.reduce((sum, d) => sum + d.visits, 0);
  const avgVisits = Math.round(totalVisits / mockVisitorData.length);
  
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            Visits Overview
          </CardTitle>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          Last 30 Days
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
            <div className="text-2xl font-display font-bold text-primary">{totalVisits}</div>
            <div className="text-xs text-muted-foreground">Total Visits</div>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
            <div className="text-2xl font-display font-bold text-green-400">{avgVisits}</div>
            <div className="text-xs text-muted-foreground">Avg/Day</div>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
            <div className="text-2xl font-display font-bold text-blue-400">{mockVisitorData[mockVisitorData.length - 1]?.visits || 0}</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-2xl font-display font-bold text-green-400">+12%</span>
            </div>
            <div className="text-xs text-muted-foreground">vs Last Month</div>
          </div>
        </div>
        
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockVisitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(187 100% 50% / 0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={10}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(187 100% 50% / 0.3)",
                  borderRadius: "8px",
                  fontSize: "12px"
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="hsl(187 100% 50%)" 
                strokeWidth={2}
                dot={false}
                name="Visits"
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                stroke="hsl(210 100% 60%)" 
                strokeWidth={2}
                dot={false}
                name="Page Views"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
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
            data-testid="input-admin-project-desc"
          />
          <div className="flex gap-2 flex-wrap">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px] bg-background/50 border-primary/20" data-testid="select-admin-project-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="functional">Functional</SelectItem>
                <SelectItem value="decorative">Decorative</SelectItem>
                <SelectItem value="prototype">Prototype</SelectItem>
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
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Current Projects ({projects.length})</h3>
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No projects yet. Add your first one above!</div>
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
                        <h4 className="font-heading font-semibold text-sm">{project.title}</h4>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
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

function ProjectsManager() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("Active");
  const [tags, setTags] = useState("");
  const [icon, setIcon] = useState("Zap");
  const [url, setUrl] = useState("");
  const [internalPath, setInternalPath] = useState("");
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const createProject = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/projects', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setTitle(""); setSlug(""); setDescription(""); setTags(""); setUrl(""); setInternalPath("");
      setStatus("Active"); setIcon("Zap");
      toast({ title: "Project created successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to create project", variant: "destructive" });
    },
  });

  const deleteProject = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({ title: "Project deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete project", variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !slug.trim() || !description.trim() || !tags.trim()) return;
    createProject.mutate({
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      status,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      icon,
      url: url.trim() || null,
      internalPath: internalPath.trim() || null,
    });
  };

  const autoSlug = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            Projects
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Add New Project</h3>
          <Input
            placeholder="Project title"
            value={title}
            onChange={(e) => autoSlug(e.target.value)}
            data-testid="input-project-title"
          />
          <Input
            placeholder="slug (auto-generated)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            data-testid="input-project-slug"
          />
          <Textarea
            placeholder="Project description (min 10 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
            data-testid="input-project-description"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger data-testid="select-project-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger data-testid="select-project-icon">
                <SelectValue placeholder="Icon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Zap">Zap</SelectItem>
                <SelectItem value="Cpu">Cpu</SelectItem>
                <SelectItem value="Shield">Shield</SelectItem>
                <SelectItem value="Lock">Lock</SelectItem>
                <SelectItem value="Wrench">Wrench</SelectItem>
                <SelectItem value="Disc3">Disc3</SelectItem>
                <SelectItem value="LayoutDashboard">Dashboard</SelectItem>
                <SelectItem value="BookOpen">BookOpen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            data-testid="input-project-tags"
          />
          <Input
            placeholder="External URL (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            data-testid="input-project-url"
          />
          <Input
            placeholder="Internal path (optional, e.g. /projects/holofans)"
            value={internalPath}
            onChange={(e) => setInternalPath(e.target.value)}
            data-testid="input-project-internal-path"
          />
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !slug.trim() || !description.trim() || !tags.trim() || createProject.isPending}
            className="w-full"
            data-testid="button-create-project"
          >
            {createProject.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Project
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">
            Existing Projects ({projects.length})
          </h3>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/50 border border-primary/10"
                  data-testid={`admin-project-${project.slug}`}
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading font-semibold text-sm truncate">{project.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{project.status}</Badge>
                      <span className="text-xs text-muted-foreground">{project.slug}</span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteProject.mutate(project.id)}
                    disabled={deleteProject.isPending}
                    data-testid={`button-delete-project-${project.slug}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ServicesManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Brain");
  const [features, setFeatures] = useState("");
  const [highlight, setHighlight] = useState(false);
  const { toast } = useToast();

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const createService = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/services', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setTitle(""); setDescription(""); setFeatures(""); setIcon("Brain"); setHighlight(false);
      toast({ title: "Service created successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to create service", variant: "destructive" });
    },
  });

  const deleteService = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({ title: "Service deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete service", variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !features.trim()) return;
    createService.mutate({
      title: title.trim(),
      description: description.trim(),
      icon,
      features: features.split(",").map(f => f.trim()).filter(Boolean),
      highlight,
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Cpu className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            Services
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Add New Service</h3>
          <Input
            placeholder="Service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="input-service-title"
          />
          <Textarea
            placeholder="Service description (min 10 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
            data-testid="input-service-description"
          />
          <Select value={icon} onValueChange={setIcon}>
            <SelectTrigger data-testid="select-service-icon">
              <SelectValue placeholder="Icon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Brain">Brain</SelectItem>
              <SelectItem value="Code">Code</SelectItem>
              <SelectItem value="Server">Server</SelectItem>
              <SelectItem value="Database">Database</SelectItem>
              <SelectItem value="Cloud">Cloud</SelectItem>
              <SelectItem value="Shield">Shield</SelectItem>
              <SelectItem value="Cpu">Cpu</SelectItem>
              <SelectItem value="Zap">Zap</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Features (comma-separated list)"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="resize-none"
            data-testid="input-service-features"
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
              className="rounded border-primary/30"
              data-testid="input-service-highlight"
            />
            Featured service
          </label>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !description.trim() || !features.trim() || createService.isPending}
            className="w-full"
            data-testid="button-create-service"
          >
            {createService.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Service
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">
            Existing Services ({services.length})
          </h3>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/50 border border-primary/10"
                  data-testid={`admin-service-${service.id}`}
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading font-semibold text-sm truncate">{service.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {service.highlight && <Badge className="text-xs bg-primary/20 text-primary">Featured</Badge>}
                      <span className="text-xs text-muted-foreground">{service.features.length} features</span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteService.mutate(service.id)}
                    disabled={deleteService.isPending}
                    data-testid={`button-delete-service-${service.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

type ProjectWithCaseStudy = Project & { caseStudy: CaseStudy | null };

function CaseStudyManager() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [deliverables, setDeliverables] = useState("");
  const [tools, setTools] = useState("");
  const [closing, setClosing] = useState("");
  const { toast } = useToast();

  const { data: projects = [] } = useQuery<ProjectWithCaseStudy[]>({
    queryKey: ['/api/projects'],
  });

  const projectsWithoutCS = projects.filter(p => !p.caseStudy);
  const projectsWithCS = projects.filter(p => p.caseStudy);

  const createCaseStudy = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/case-studies', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setSelectedProjectId(""); setDeliverables(""); setTools(""); setClosing("");
      toast({ title: "Case study created successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to create case study", variant: "destructive" });
    },
  });

  const deleteCaseStudy = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/case-studies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({ title: "Case study deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete case study", variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    if (!selectedProjectId || !deliverables.trim() || !tools.trim() || !closing.trim()) return;
    createCaseStudy.mutate({
      projectId: selectedProjectId,
      deliverables: deliverables.split("\n").map(d => d.trim()).filter(Boolean),
      tools: tools.split(",").map(t => t.trim()).filter(Boolean),
      closing: closing.trim(),
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20 lg:col-span-2" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            Case Studies
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
            <h3 className="font-heading font-semibold text-sm text-muted-foreground">Add Case Study</h3>
            <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
              <SelectTrigger data-testid="select-case-study-project">
                <SelectValue placeholder="Select project..." />
              </SelectTrigger>
              <SelectContent>
                {projectsWithoutCS.length === 0 ? (
                  <SelectItem value="none" disabled>All projects have case studies</SelectItem>
                ) : (
                  projectsWithoutCS.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Deliverables (one per line)"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              className="resize-none min-h-[100px]"
              data-testid="input-case-study-deliverables"
            />
            <Input
              placeholder="Tools (comma-separated)"
              value={tools}
              onChange={(e) => setTools(e.target.value)}
              data-testid="input-case-study-tools"
            />
            <Textarea
              placeholder="Closing statement"
              value={closing}
              onChange={(e) => setClosing(e.target.value)}
              className="resize-none"
              data-testid="input-case-study-closing"
            />
            <Button
              onClick={handleSubmit}
              disabled={!selectedProjectId || selectedProjectId === "none" || !deliverables.trim() || !tools.trim() || !closing.trim() || createCaseStudy.isPending}
              className="w-full"
              data-testid="button-create-case-study"
            >
              {createCaseStudy.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Add Case Study
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-sm text-muted-foreground">
              Existing Case Studies ({projectsWithCS.length})
            </h3>
            {projectsWithCS.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No case studies yet</p>
            ) : (
              <div className="space-y-2">
                {projectsWithCS.map((project) => (
                  <div
                    key={project.id}
                    className="p-3 rounded-lg bg-background/50 border border-primary/10"
                    data-testid={`admin-case-study-${project.slug}`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="font-heading font-semibold text-sm truncate">{project.title}</h4>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => project.caseStudy && deleteCaseStudy.mutate(project.caseStudy.id)}
                        disabled={deleteCaseStudy.isPending}
                        data-testid={`button-delete-case-study-${project.slug}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        {project.caseStudy?.deliverables.length} deliverables, {project.caseStudy?.tools.length} tools
                      </p>
                      <p className="text-xs text-muted-foreground italic truncate">
                        {project.caseStudy?.closing}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  const { data: adminCheck, isLoading: adminLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ['/api/auth/is-admin'],
    enabled: isAuthenticated,
  });

  const isAdmin = adminCheck?.isAdmin ?? false;

  if (isLoading || (isAuthenticated && adminLoading)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
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
              <Shield className="w-16 h-16 mx-auto mb-4 text-primary/50" />
              <h1 
                className="font-display text-2xl font-bold tracking-wider mb-4"
                style={{ color: "hsl(187 100% 50%)" }}
              >
                Admin Access Required
              </h1>
              <p className="text-muted-foreground mb-6">
                Please log in to access the admin dashboard.
              </p>
              <Link href="/login">
                <Button className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Log In
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
      <div className="flex pt-16">
        <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-4rem)] bg-card/30 backdrop-blur-xl border-r border-primary/20 p-4 sticky top-16">
          <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-heading text-primary">Logged in as admin</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 truncate">{user?.email}</p>
          </div>
          
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                }`}
                data-testid={`button-admin-nav-${item.id}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-heading">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="mt-auto pt-6">
            <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Updates</span>
                  <Badge variant="outline" className="text-xs">12</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">3D Projects</span>
                  <Badge variant="outline" className="text-xs">5</Badge>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 pb-16">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  className="gap-2 shrink-0"
                  data-testid={`button-admin-mobile-nav-${item.id}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h1
                  className="font-display text-2xl sm:text-3xl font-bold tracking-wider"
                  style={{
                    color: "hsl(187 100% 50%)",
                    textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
                  }}
                  data-testid="text-admin-title"
                >
                  {activeSection === "dashboard" && "Dashboard"}
                  {activeSection === "content" && "Content Management"}
                  {activeSection === "portfolio" && "Portfolio Management"}
                  {activeSection === "analytics" && "Analytics"}
                </h1>
              </div>
              <p className="text-muted-foreground font-heading tracking-wide">
                Welcome back, {user?.firstName || 'Admin'}!
              </p>
            </div>

            {activeSection === "dashboard" && (
              <div className="space-y-6">
                <VisitorOverview />
                <div className="grid gap-6 lg:grid-cols-2">
                  <TodaysWorkSection />
                  <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
                          Quick Actions
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-3 border-primary/30"
                        onClick={() => setActiveSection("content")}
                      >
                        <Edit className="w-4 h-4" />
                        Post New Update
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-3 border-primary/30"
                        onClick={() => setActiveSection("content")}
                      >
                        <Printer className="w-4 h-4" />
                        Add 3D Project
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-3 border-primary/30"
                        onClick={() => setActiveSection("portfolio")}
                      >
                        <Briefcase className="w-4 h-4" />
                        Manage Portfolio
                      </Button>
                      <Link href="/blog">
                        <Button variant="outline" className="w-full justify-start gap-3 border-primary/30">
                          <FileText className="w-4 h-4" />
                          View Blog
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === "content" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <WorkUpdatesManager />
                <PrintingProjectsManager />
              </div>
            )}

            {activeSection === "portfolio" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <ProjectsManager />
                <ServicesManager />
                <CaseStudyManager />
              </div>
            )}

            {activeSection === "analytics" && (
              <div className="space-y-6">
                <VisitorOverview />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-card/50 backdrop-blur-xl border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Users className="w-8 h-8 text-primary" />
                        <div>
                          <div className="text-2xl font-display font-bold">847</div>
                          <div className="text-sm text-muted-foreground">Total Users</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        +23% from last month
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur-xl border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-8 h-8 text-blue-400" />
                        <div>
                          <div className="text-2xl font-display font-bold">24</div>
                          <div className="text-sm text-muted-foreground">Blog Posts</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        +5 this month
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur-xl border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Activity className="w-8 h-8 text-green-400" />
                        <div>
                          <div className="text-2xl font-display font-bold">99.9%</div>
                          <div className="text-sm text-muted-foreground">Uptime</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        Last 30 days
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
