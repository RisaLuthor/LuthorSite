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
import { Briefcase, FileText, Plus, Trash2, Loader2 } from "lucide-react";
import type { Project, Service, CaseStudy } from "@shared/schema";

type ProjectWithCaseStudy = Project & { caseStudy: CaseStudy | null };

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
          <Input placeholder="Project title" value={title} onChange={(e) => autoSlug(e.target.value)} data-testid="input-project-title" />
          <Input placeholder="slug (auto-generated)" value={slug} onChange={(e) => setSlug(e.target.value)} data-testid="input-project-slug" />
          <Textarea placeholder="Project description (min 10 characters)" value={description} onChange={(e) => setDescription(e.target.value)} className="resize-none" data-testid="input-project-description" />
          <div className="grid grid-cols-2 gap-3">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger data-testid="select-project-status"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger data-testid="select-project-icon"><SelectValue placeholder="Icon" /></SelectTrigger>
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
          <Input placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} data-testid="input-project-tags" />
          <Input placeholder="External URL (optional)" value={url} onChange={(e) => setUrl(e.target.value)} data-testid="input-project-url" />
          <Input placeholder="Internal path (optional, e.g. /projects/holofans)" value={internalPath} onChange={(e) => setInternalPath(e.target.value)} data-testid="input-project-internal-path" />
          <Button onClick={handleSubmit} disabled={!title.trim() || !slug.trim() || !description.trim() || !tags.trim() || createProject.isPending} className="w-full" data-testid="button-create-project">
            {createProject.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Project
          </Button>
        </div>
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground">Existing Projects ({projects.length})</h3>
          {isLoading ? (
            <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/50 border border-primary/10" data-testid={`admin-project-${project.slug}`}>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading font-semibold text-sm truncate">{project.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{project.status}</Badge>
                      <span className="text-xs text-muted-foreground">{project.slug}</span>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => deleteProject.mutate(project.id)} disabled={deleteProject.isPending} data-testid={`button-delete-project-${project.slug}`}>
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
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>Case Studies</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
            <h3 className="font-heading font-semibold text-sm text-muted-foreground">Add Case Study</h3>
            <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
              <SelectTrigger data-testid="select-case-study-project"><SelectValue placeholder="Select project..." /></SelectTrigger>
              <SelectContent>
                {projectsWithoutCS.length === 0 ? (
                  <SelectItem value="none" disabled>All projects have case studies</SelectItem>
                ) : (
                  projectsWithoutCS.map(p => (<SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>))
                )}
              </SelectContent>
            </Select>
            <Textarea placeholder="Deliverables (one per line)" value={deliverables} onChange={(e) => setDeliverables(e.target.value)} className="resize-none min-h-[100px]" data-testid="input-case-study-deliverables" />
            <Input placeholder="Tools (comma-separated)" value={tools} onChange={(e) => setTools(e.target.value)} data-testid="input-case-study-tools" />
            <Textarea placeholder="Closing statement" value={closing} onChange={(e) => setClosing(e.target.value)} className="resize-none" data-testid="input-case-study-closing" />
            <Button onClick={handleSubmit} disabled={!selectedProjectId || selectedProjectId === "none" || !deliverables.trim() || !tools.trim() || !closing.trim() || createCaseStudy.isPending} className="w-full" data-testid="button-create-case-study">
              {createCaseStudy.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Add Case Study
            </Button>
          </div>
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-sm text-muted-foreground">Existing Case Studies ({projectsWithCS.length})</h3>
            {projectsWithCS.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No case studies yet</p>
            ) : (
              <div className="space-y-2">
                {projectsWithCS.map((project) => (
                  <div key={project.id} className="p-3 rounded-lg bg-background/50 border border-primary/10" data-testid={`admin-case-study-${project.slug}`}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="font-heading font-semibold text-sm truncate">{project.title}</h4>
                      <Button size="icon" variant="ghost" onClick={() => project.caseStudy && deleteCaseStudy.mutate(project.caseStudy.id)} disabled={deleteCaseStudy.isPending} data-testid={`button-delete-case-study-${project.slug}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{project.caseStudy?.deliverables.length} deliverables, {project.caseStudy?.tools.length} tools</p>
                      <p className="text-xs text-muted-foreground italic truncate">{project.caseStudy?.closing}</p>
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

export default function AdminProjects() {
  return (
    <AdminLayout>
      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectsManager />
        <div />
        <CaseStudyManager />
      </div>
    </AdminLayout>
  );
}
