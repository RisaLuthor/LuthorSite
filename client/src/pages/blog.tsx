import { useState, useEffect } from "react";
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
import { Calendar, ChevronLeft, ChevronRight, MessageSquare, Printer, Cpu, Send, Clock, User, HardDrive, Box, ThumbsUp, Heart, ThumbsDown, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import type { WorkUpdate, BlogComment, PrintingProject } from "@shared/schema";

function getVisitorId(): string {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = 'visitor-' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
}

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

function CalendarSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  
  const timeMin = startOfMonth(currentMonth).toISOString();
  const timeMax = endOfMonth(currentMonth).toISOString();
  
  const { data: events = [], isLoading } = useQuery<CalendarEvent[]>({
    queryKey: ['/api/calendar/events', timeMin, timeMax],
    queryFn: () => fetch(`/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`).then(r => r.json()),
  });

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const startDay = startOfMonth(currentMonth).getDay();
  const paddingDays = Array(startDay).fill(null);

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = event.start?.dateTime || event.start?.date;
      if (!eventDate) return false;
      return isSameDay(new Date(eventDate), date);
    });
  };

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  const formatEventTime = (event: CalendarEvent) => {
    const startTime = event.start?.dateTime;
    const endTime = event.end?.dateTime;
    
    if (startTime && endTime) {
      return `${format(new Date(startTime), 'h:mm a')} - ${format(new Date(endTime), 'h:mm a')}`;
    }
    return 'All day';
  };

  return (
    <>
      <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
              Schedule
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              data-testid="button-prev-month"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-heading text-sm min-w-[120px] text-center" data-testid="text-current-month">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              data-testid="button-next-month"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-4">
            Click on any day to see what was worked on
          </p>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading calendar...</div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs text-muted-foreground py-2 font-heading">
                  {day}
                </div>
              ))}
              {paddingDays.map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square" />
              ))}
              {days.map(day => {
                const dayEvents = getEventsForDay(day);
                const isToday = isSameDay(day, new Date());
                const hasEvents = dayEvents.length > 0;
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square p-1 rounded-md border transition-all cursor-pointer ${
                      isToday 
                        ? 'border-primary bg-primary/10' 
                        : hasEvents
                          ? 'border-primary/40 bg-primary/5 hover:bg-primary/15'
                          : 'border-transparent hover:border-primary/30 hover:bg-primary/5'
                    }`}
                    data-testid={`calendar-day-${format(day, 'yyyy-MM-dd')}`}
                  >
                    <div className={`text-xs text-center ${isToday ? 'text-primary font-bold' : hasEvents ? 'text-primary' : 'text-muted-foreground'}`}>
                      {format(day, 'd')}
                    </div>
                    {hasEvents && (
                      <div className="mt-0.5 flex flex-col gap-0.5 overflow-hidden">
                        {dayEvents.slice(0, 2).map(event => (
                          <div 
                            key={event.id} 
                            className="text-[8px] bg-primary/20 text-primary rounded px-0.5 truncate"
                            title={event.summary}
                          >
                            {event.summary}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[8px] text-primary/70">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-primary/30" style={{ boxShadow: "0 0 50px hsl(187 100% 50% / 0.2)" }}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
              <Calendar className="w-5 h-5" />
              {selectedDay && format(selectedDay, 'EEEE, MMMM d, yyyy')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {selectedDayEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No work scheduled for this day</p>
              </div>
            ) : (
              selectedDayEvents.map(event => (
                <Card key={event.id} className="bg-background/50 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-full min-h-[40px] bg-primary rounded-full" />
                      <div className="flex-1">
                        <h4 className="font-heading text-base" style={{ color: "hsl(187 100% 50%)" }}>
                          {event.summary}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatEventTime(event)}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Box className="w-3.5 h-3.5" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.description && (
                          <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ReactionButtons({ updateId }: { updateId: string }) {
  const visitorId = getVisitorId();
  const { toast } = useToast();

  const { data: reactions = { like: 0, love: 0, dislike: 0 } } = useQuery<{ like: number; love: number; dislike: number }>({
    queryKey: ['/api/blog/updates', updateId, 'reactions'],
    queryFn: () => fetch(`/api/blog/updates/${updateId}/reactions`).then(r => r.json()),
  });

  const { data: myReaction } = useQuery<{ reaction: string | null }>({
    queryKey: ['/api/blog/updates', updateId, 'my-reaction', visitorId],
    queryFn: () => fetch(`/api/blog/updates/${updateId}/my-reaction?visitorId=${visitorId}`).then(r => r.json()),
  });

  const toggleReaction = useMutation({
    mutationFn: (reactionType: "like" | "love" | "dislike") =>
      apiRequest('POST', `/api/blog/updates/${updateId}/reactions`, { reactionType, visitorId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/updates', updateId, 'reactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/updates', updateId, 'my-reaction', visitorId] });
    },
    onError: () => {
      toast({ title: "Failed to react", variant: "destructive" });
    },
  });

  return (
    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-primary/10">
      <Button
        size="sm"
        variant={myReaction?.reaction === 'like' ? 'default' : 'ghost'}
        className="gap-1 h-8"
        onClick={() => toggleReaction.mutate('like')}
        disabled={toggleReaction.isPending}
        data-testid={`button-like-${updateId}`}
      >
        <ThumbsUp className="w-4 h-4" />
        <span className="text-xs">{reactions.like}</span>
      </Button>
      <Button
        size="sm"
        variant={myReaction?.reaction === 'love' ? 'default' : 'ghost'}
        className="gap-1 h-8"
        onClick={() => toggleReaction.mutate('love')}
        disabled={toggleReaction.isPending}
        data-testid={`button-love-${updateId}`}
      >
        <Heart className={`w-4 h-4 ${myReaction?.reaction === 'love' ? 'fill-current' : ''}`} />
        <span className="text-xs">{reactions.love}</span>
      </Button>
      <Button
        size="sm"
        variant={myReaction?.reaction === 'dislike' ? 'default' : 'ghost'}
        className="gap-1 h-8"
        onClick={() => toggleReaction.mutate('dislike')}
        disabled={toggleReaction.isPending}
        data-testid={`button-dislike-${updateId}`}
      >
        <ThumbsDown className="w-4 h-4" />
        <span className="text-xs">{reactions.dislike}</span>
      </Button>
    </div>
  );
}

function WorkUpdatesSection({ isAdmin }: { isAdmin: boolean }) {
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
      toast({ title: "Update posted!" });
    },
    onError: () => {
      toast({ title: "Failed to post update", variant: "destructive" });
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
          <MessageSquare className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            What I'm Working On
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdmin && (
          <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10">
            <Input
              placeholder="Update title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary"
              data-testid="input-update-title"
            />
            <Textarea
              placeholder="What are you working on?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary min-h-[80px]"
              data-testid="input-update-content"
            />
            <div className="flex gap-2 flex-wrap">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[160px] bg-background/50 border-primary/20" data-testid="select-update-category">
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
                className="ml-auto"
                data-testid="button-post-update"
              >
                Post Update
              </Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading updates...</div>
        ) : updates.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No updates yet</div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {updates.map((update) => (
              <div 
                key={update.id} 
                className="p-4 rounded-lg bg-background/30 border border-primary/10 hover:border-primary/20 transition-colors"
                data-testid={`card-update-${update.id}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">{update.title}</h3>
                  <Badge className={`${getCategoryColor(update.category || 'general')} flex items-center gap-1`}>
                    {getCategoryIcon(update.category || 'general')}
                    {update.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{update.content}</p>
                <div className="text-xs text-muted-foreground/60">
                  {update.createdAt && format(new Date(update.createdAt), 'MMM d, yyyy h:mm a')}
                </div>
                <ReactionButtons updateId={update.id} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CommentsSection() {
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const { data: comments = [], isLoading } = useQuery<BlogComment[]>({
    queryKey: ['/api/blog/comments'],
  });

  const createComment = useMutation({
    mutationFn: (data: { authorName: string; content: string }) =>
      apiRequest('POST', '/api/blog/comments', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/comments'] });
      setContent("");
      toast({ title: "Comment posted!" });
    },
    onError: () => {
      toast({ title: "Failed to post comment", variant: "destructive" });
    },
  });

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            Comments
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="bg-background/50 border-primary/20 focus:border-primary flex-1 min-w-[150px]"
            data-testid="input-comment-author"
          />
          <Input
            placeholder="Leave a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-background/50 border-primary/20 focus:border-primary flex-[2] min-w-[200px]"
            data-testid="input-comment-content"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && authorName.trim() && content.trim()) {
                createComment.mutate({ authorName, content });
              }
            }}
          />
          <Button 
            size="icon"
            onClick={() => createComment.mutate({ authorName, content })}
            disabled={!authorName.trim() || !content.trim() || createComment.isPending}
            data-testid="button-post-comment"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground text-sm">No comments yet. Be the first!</div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="p-3 rounded-lg bg-background/30 border border-primary/10"
                data-testid={`card-comment-${comment.id}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading text-sm font-semibold text-foreground">{comment.authorName}</span>
                  <span className="text-xs text-muted-foreground/60">
                    {comment.createdAt && format(new Date(comment.createdAt), 'MMM d, h:mm a')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PrintingProjectsSection() {
  const { data: projects = [], isLoading } = useQuery<PrintingProject[]>({
    queryKey: ['/api/blog/printing-projects'],
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
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No projects yet</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => {
              const specs = project.specifications as { storageBays?: number; storageCapacity?: string; features?: string[] } | null;
              return (
                <div 
                  key={project.id} 
                  className="p-4 rounded-lg bg-background/30 border border-primary/10 hover:border-primary/30 transition-all group"
                  data-testid={`card-project-${project.id}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-primary" />
                      <h3 className="font-heading font-semibold text-foreground">{project.title}</h3>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status?.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  
                  {specs && (
                    <div className="space-y-2 text-xs">
                      {specs.storageBays && (
                        <div className="flex items-center gap-2">
                          <Box className="w-3 h-3 text-primary/60" />
                          <span className="text-muted-foreground">{specs.storageBays} Storage Bays</span>
                        </div>
                      )}
                      {specs.storageCapacity && (
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-3 h-3 text-primary/60" />
                          <span className="text-muted-foreground">{specs.storageCapacity} Capacity</span>
                        </div>
                      )}
                      {specs.features && specs.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {specs.features.slice(0, 3).map((feature, i) => (
                            <Badge key={i} variant="outline" className="text-[10px] border-primary/20">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {project.buildInstructions && (
                    <div className="mt-3 pt-3 border-t border-primary/10">
                      <p className="text-xs text-muted-foreground/80 line-clamp-2">{project.buildInstructions}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Blog() {
  const { data: adminCheck } = useQuery<{ isAdmin: boolean }>({
    queryKey: ['/api/auth/is-admin'],
    queryFn: () => fetch('/api/auth/is-admin').then(r => r.json()),
  });

  const isAdmin = adminCheck?.isAdmin ?? false;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider mb-4"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50%), 0 0 20px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-blog-title"
            >
              Dashboard
            </h1>
            <p className="text-muted-foreground font-heading tracking-wide max-w-2xl mx-auto" data-testid="text-blog-subtitle">
              Schedule, updates, and projects from the Luthor.Tech lab
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
              <CalendarSection />
              <CommentsSection />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <WorkUpdatesSection isAdmin={isAdmin} />
              <PrintingProjectsSection />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
