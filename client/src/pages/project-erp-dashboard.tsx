import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";

const teamMembers = [
  { name: "Project Lead", status: "Active", tasks: 12 },
  { name: "Developer 1", status: "Active", tasks: 8 },
  { name: "Developer 2", status: "Away", tasks: 5 },
  { name: "Designer", status: "Active", tasks: 6 },
  { name: "QA Engineer", status: "Active", tasks: 10 },
];

const recentActivities = [
  { action: "Sprint Planning completed", time: "2 hours ago", type: "milestone" },
  { action: "New feature deployed to staging", time: "4 hours ago", type: "deployment" },
  { action: "Code review approved", time: "Yesterday", type: "review" },
  { action: "Bug fix merged to main", time: "Yesterday", type: "fix" },
  { action: "Documentation updated", time: "2 days ago", type: "docs" },
];

const projectStats = [
  { label: "Active Projects", value: "5", icon: LayoutDashboard, color: "text-cyan-400" },
  { label: "Team Members", value: "12", icon: Users, color: "text-blue-400" },
  { label: "Tasks Completed", value: "156", icon: CheckCircle2, color: "text-green-400" },
  { label: "Hours Logged", value: "2,340", icon: Clock, color: "text-amber-400" },
];

export default function ProjectErpDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/projects">
              <Button variant="ghost" className="gap-2 mb-4" data-testid="button-back-projects">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Button>
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1
                  className="font-display text-3xl sm:text-4xl font-bold tracking-wider mb-2"
                  style={{
                    color: "hsl(187 100% 50%)",
                    textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
                  }}
                  data-testid="text-erp-title"
                >
                  ERP Team Dashboard
                </h1>
                <p className="text-muted-foreground font-heading" data-testid="text-erp-subtitle">
                  Enterprise resource planning and team coordination center
                </p>
              </div>
              <Badge 
                className="bg-green-500/20 text-green-400 border-green-500/30 self-start"
              >
                System Online
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {projectStats.map((stat) => (
              <Card 
                key={stat.label}
                className="bg-card/50 backdrop-blur-xl border-primary/20"
                style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
                data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-md flex items-center justify-center"
                      style={{
                        background: "hsl(187 100% 50% / 0.1)",
                        border: "1px solid hsl(187 100% 50% / 0.3)",
                      }}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-display" style={{ color: "hsl(187 100% 70%)" }}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card 
              className="lg:col-span-2 bg-card/50 backdrop-blur-xl border-primary/20"
              style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display" style={{ color: "hsl(187 100% 50%)" }}>
                  <TrendingUp className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg bg-background/50 border border-primary/10"
                      data-testid={`item-activity-${index}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card 
              className="bg-card/50 backdrop-blur-xl border-primary/20"
              style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display" style={{ color: "hsl(187 100% 50%)" }}>
                  <Users className="w-5 h-5" />
                  Team Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-background/30"
                      data-testid={`item-team-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            member.status === "Active" ? "bg-green-400" : "bg-yellow-400"
                          }`} 
                        />
                        <span className="text-sm font-medium">{member.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {member.tasks} tasks
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Card 
              className="bg-card/50 backdrop-blur-xl border-primary/20 hover:-translate-y-1 transition-transform cursor-pointer"
              style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
              data-testid="card-quick-calendar"
            >
              <CardContent className="p-6 flex items-center gap-4">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-heading font-semibold" style={{ color: "hsl(187 100% 70%)" }}>
                    Calendar
                  </p>
                  <p className="text-sm text-muted-foreground">View schedule</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="bg-card/50 backdrop-blur-xl border-primary/20 hover:-translate-y-1 transition-transform cursor-pointer"
              style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
              data-testid="card-quick-reports"
            >
              <CardContent className="p-6 flex items-center gap-4">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-heading font-semibold" style={{ color: "hsl(187 100% 70%)" }}>
                    Reports
                  </p>
                  <p className="text-sm text-muted-foreground">Generate reports</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="bg-card/50 backdrop-blur-xl border-primary/20 hover:-translate-y-1 transition-transform cursor-pointer"
              style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.1)" }}
              data-testid="card-quick-settings"
            >
              <CardContent className="p-6 flex items-center gap-4">
                <Settings className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-heading font-semibold" style={{ color: "hsl(187 100% 70%)" }}>
                    Settings
                  </p>
                  <p className="text-sm text-muted-foreground">Configure dashboard</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
