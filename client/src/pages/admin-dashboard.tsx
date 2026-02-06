import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  Edit,
  Printer,
  Box,
  Clock,
  Calendar,
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  Activity,
  Briefcase,
} from "lucide-react";
import { format, startOfDay, endOfDay, subDays } from "date-fns";

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

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
        <Badge className="bg-primary/20 text-primary border-primary/30">Last 30 Days</Badge>
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
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} interval="preserveStartEnd" />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(187 100% 50% / 0.3)", borderRadius: "8px", fontSize: "12px" }} />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="hsl(187 100% 50%)" strokeWidth={2} dot={false} name="Visits" />
              <Line type="monotone" dataKey="pageViews" stroke="hsl(210 100% 60%)" strokeWidth={2} dot={false} name="Page Views" />
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
        <Badge className="bg-primary/20 text-primary border-primary/30">{format(today, 'EEEE, MMM d')}</Badge>
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
              <div key={event.id} className="p-3 rounded-lg bg-background/50 border border-primary/20" data-testid={`card-today-event-${event.id}`}>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-full min-h-[40px] bg-primary rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold truncate" style={{ color: "hsl(187 100% 50%)" }}>{event.summary}</h4>
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
                      <p className="mt-2 text-sm text-foreground/70 line-clamp-2">{event.description}</p>
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

function QuickActions() {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>Quick Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/admin/modules">
          <Button variant="outline" className="w-full justify-start gap-3 border-primary/30" data-testid="button-quick-post-update">
            <Edit className="w-4 h-4" />
            Post New Update
          </Button>
        </Link>
        <Link href="/admin/modules">
          <Button variant="outline" className="w-full justify-start gap-3 border-primary/30" data-testid="button-quick-add-3d">
            <Printer className="w-4 h-4" />
            Add 3D Project
          </Button>
        </Link>
        <Link href="/admin/projects">
          <Button variant="outline" className="w-full justify-start gap-3 border-primary/30" data-testid="button-quick-manage-portfolio">
            <Briefcase className="w-4 h-4" />
            Manage Portfolio
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="outline" className="w-full justify-start gap-3 border-primary/30" data-testid="button-quick-view-blog">
            <FileText className="w-4 h-4" />
            View Blog
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function AnalyticsCards() {
  return (
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
  );
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <VisitorOverview />
        <div className="grid gap-6 lg:grid-cols-2">
          <TodaysWorkSection />
          <QuickActions />
        </div>
        <AnalyticsCards />
      </div>
    </AdminLayout>
  );
}
