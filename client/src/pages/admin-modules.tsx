import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Edit,
  Cpu,
  Printer,
  Box,
  Clock,
  Plus,
  Trash2,
  Send,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import type { WorkUpdate, PrintingProject, Service } from "@shared/schema";

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
      setTitle(""); setContent(""); setCategory("general");
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
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>Work Updates</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Post New Update</h3>
          <Input placeholder="Update title..." value={title} onChange={(e) => setTitle(e.target.value)} className="bg-background/50 border-primary/20 focus:border-primary" data-testid="input-admin-update-title" />
          <Textarea placeholder="What are you working on?" value={content} onChange={(e) => setContent(e.target.value)} className="bg-background/50 border-primary/20 focus:border-primary min-h-[100px]" data-testid="input-admin-update-content" />
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
            <Button onClick={() => createUpdate.mutate({ title, content, category })} disabled={!title.trim() || !content.trim() || createUpdate.isPending} className="gap-2" data-testid="button-admin-post-update">
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
                <div key={update.id} className="p-3 rounded-lg bg-background/30 border border-primary/10" data-testid={`card-admin-update-${update.id}`}>
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
                    <Button size="icon" variant="ghost" className="shrink-0 text-destructive hover:text-destructive" onClick={() => deleteUpdate.mutate(update.id)} disabled={deleteUpdate.isPending} data-testid={`button-delete-update-${update.id}`}>
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
      setTitle(""); setDescription(""); setCategory("custom"); setStatus("available");
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

  const getStatusColor = (s: string | null) => {
    switch (s) {
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
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>3D Printing Projects</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Add New Project</h3>
          <Input placeholder="Project title..." value={title} onChange={(e) => setTitle(e.target.value)} className="bg-background/50 border-primary/20 focus:border-primary" data-testid="input-admin-project-title" />
          <Textarea placeholder="Project description..." value={description} onChange={(e) => setDescription(e.target.value)} className="bg-background/50 border-primary/20 focus:border-primary min-h-[80px]" data-testid="input-admin-project-desc" />
          <div className="flex gap-2 flex-wrap">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px] bg-background/50 border-primary/20" data-testid="select-admin-project-category"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="functional">Functional</SelectItem>
                <SelectItem value="decorative">Decorative</SelectItem>
                <SelectItem value="prototype">Prototype</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px] bg-background/50 border-primary/20" data-testid="select-admin-project-status"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="coming-soon">Coming Soon</SelectItem>
                <SelectItem value="custom-order">Custom Order</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => createProject.mutate({ title, description, category, status })} disabled={!title.trim() || !description.trim() || createProject.isPending} className="gap-2" data-testid="button-admin-add-project">
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
                <div key={project.id} className="p-3 rounded-lg bg-background/30 border border-primary/10" data-testid={`card-admin-project-${project.id}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-heading font-semibold text-sm">{project.title}</h4>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="shrink-0 text-destructive hover:text-destructive" onClick={() => deleteProject.mutate(project.id)} disabled={deleteProject.isPending} data-testid={`button-delete-project-${project.id}`}>
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
      features: features.split("\n").map(f => f.trim()).filter(Boolean),
      highlight,
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20 lg:col-span-2" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Box className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>Services / Skill Sets</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Add New Service</h3>
          <Input placeholder="Service title" value={title} onChange={(e) => setTitle(e.target.value)} data-testid="input-service-title" />
          <Textarea placeholder="Service description (min 10 characters)" value={description} onChange={(e) => setDescription(e.target.value)} className="resize-none" data-testid="input-service-description" />
          <Select value={icon} onValueChange={setIcon}>
            <SelectTrigger data-testid="select-service-icon"><SelectValue placeholder="Icon" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Brain">Brain</SelectItem>
              <SelectItem value="Code">Code</SelectItem>
              <SelectItem value="Server">Server</SelectItem>
              <SelectItem value="Database">Database</SelectItem>
              <SelectItem value="Cloud">Cloud</SelectItem>
              <SelectItem value="Shield">Shield</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Features (one per line)" value={features} onChange={(e) => setFeatures(e.target.value)} className="resize-none min-h-[100px]" data-testid="input-service-features" />
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} className="rounded border-primary/30" data-testid="input-service-highlight" />
            Featured service
          </label>
          <Button onClick={handleSubmit} disabled={!title.trim() || !description.trim() || !features.trim() || createService.isPending} className="w-full" data-testid="button-create-service">
            {createService.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Service
          </Button>
        </div>
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Existing Services ({services.length})</h3>
          {isLoading ? (
            <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (
            <div className="space-y-2">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/50 border border-primary/10" data-testid={`admin-service-${service.id}`}>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading font-semibold text-sm truncate">{service.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {service.highlight && <Badge className="text-xs bg-primary/20 text-primary">Featured</Badge>}
                      <span className="text-xs text-muted-foreground">{service.features.length} features</span>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => deleteService.mutate(service.id)} disabled={deleteService.isPending} data-testid={`button-delete-service-${service.id}`}>
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

export default function AdminModules() {
  return (
    <AdminLayout>
      <div className="grid gap-6 lg:grid-cols-2">
        <WorkUpdatesManager />
        <PrintingProjectsManager />
        <ServicesManager />
      </div>
    </AdminLayout>
  );
}
