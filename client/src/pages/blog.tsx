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

interface Holiday {
  name: string;
  month: number;
  day: number;
  gif: string;
}

const HOLIDAYS: Holiday[] = [
  { name: "New Year's Day", month: 1, day: 1, gif: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=200&h=200&fit=crop" },
  { name: "Valentine's Day", month: 2, day: 14, gif: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&h=200&fit=crop" },
  { name: "St. Patrick's Day", month: 3, day: 17, gif: "https://images.unsplash.com/photo-1521543832500-49e69f7087cc?w=200&h=200&fit=crop" },
  { name: "Easter", month: 4, day: 20, gif: "https://images.unsplash.com/photo-1457301547464-55b8223ec157?w=200&h=200&fit=crop" },
  { name: "Mother's Day", month: 5, day: 11, gif: "https://images.unsplash.com/photo-1462275646964-a0e3f8b0a571?w=200&h=200&fit=crop" },
  { name: "Father's Day", month: 6, day: 15, gif: "https://images.unsplash.com/photo-1586808651018-3c70a05b8e8c?w=200&h=200&fit=crop" },
  { name: "Independence Day", month: 7, day: 4, gif: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=200&h=200&fit=crop" },
  { name: "Labor Day", month: 9, day: 1, gif: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&h=200&fit=crop" },
  { name: "Halloween", month: 10, day: 31, gif: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=200&h=200&fit=crop" },
  { name: "Thanksgiving", month: 11, day: 27, gif: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=200&h=200&fit=crop" },
  { name: "Christmas Eve", month: 12, day: 24, gif: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=200&h=200&fit=crop" },
  { name: "Christmas Day", month: 12, day: 25, gif: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=200&h=200&fit=crop" },
  { name: "New Year's Eve", month: 12, day: 31, gif: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop" },
];

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

  const currentMonthNumber = currentMonth.getMonth() + 1;
  const monthHolidays = HOLIDAYS.filter(h => h.month === currentMonthNumber);

  const getHolidayForDay = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return HOLIDAYS.find(h => h.month === month && h.day === day);
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
          {monthHolidays.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-heading text-muted-foreground mb-2 uppercase tracking-wider">Upcoming Holidays</h4>
              <div className="flex flex-wrap gap-2">
                {monthHolidays.map(holiday => (
                  <div 
                    key={holiday.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30"
                    data-testid={`holiday-${holiday.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 border border-amber-500/40">
                      <img 
                        src={holiday.gif} 
                        alt={holiday.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-heading text-xs text-amber-500">{holiday.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {format(new Date(currentMonth.getFullYear(), holiday.month - 1, holiday.day), 'MMM d')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                const holiday = getHolidayForDay(day);
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square p-0.5 rounded-md border transition-all cursor-pointer relative overflow-hidden ${
                      holiday
                        ? 'border-amber-500/60 hover:border-amber-500'
                        : isToday 
                          ? 'border-primary bg-primary/10' 
                          : hasEvents
                            ? 'border-primary/40 bg-primary/5 hover:bg-primary/15'
                            : 'border-transparent hover:border-primary/30 hover:bg-primary/5'
                    }`}
                    data-testid={`calendar-day-${format(day, 'yyyy-MM-dd')}`}
                    title={holiday ? holiday.name : undefined}
                  >
                    {holiday && (
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={holiday.gif}
                          alt={holiday.name}
                          className="w-full h-full object-cover opacity-60"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>
                    )}
                    <div className={`relative z-10 h-full flex flex-col justify-between p-0.5`}>
                      <div className={`text-xs text-center font-semibold ${holiday ? 'text-white drop-shadow-md' : isToday ? 'text-primary font-bold' : hasEvents ? 'text-primary' : 'text-muted-foreground'}`}>
                        {format(day, 'd')}
                      </div>
                      {holiday && (
                        <div className="text-[6px] text-white/90 truncate text-center drop-shadow-md font-medium leading-tight">
                          {holiday.name}
                        </div>
                      )}
                      {hasEvents && !holiday && (
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          {dayEvents.slice(0, 1).map(event => (
                            <div 
                              key={event.id} 
                              className="text-[7px] bg-primary/20 text-primary rounded px-0.5 truncate"
                              title={event.summary}
                            >
                              {event.summary}
                            </div>
                          ))}
                          {dayEvents.length > 1 && (
                            <div className="text-[7px] text-primary/70">+{dayEvents.length - 1}</div>
                          )}
                        </div>
                      )}
                    </div>
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
            {selectedDay && getHolidayForDay(selectedDay) && (
              <Card className="bg-amber-500/10 border-amber-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-amber-500/40 flex-shrink-0">
                      <img 
                        src={getHolidayForDay(selectedDay)!.gif}
                        alt={getHolidayForDay(selectedDay)!.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/40 mb-2">Holiday</Badge>
                      <h4 className="font-heading text-lg text-amber-500">
                        {getHolidayForDay(selectedDay)!.name}
                      </h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {selectedDayEvents.length === 0 && !(selectedDay && getHolidayForDay(selectedDay)) ? (
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

function CurrentWorkFromCalendar() {
  const today = new Date();
  const timeMin = startOfMonth(today).toISOString();
  const timeMax = endOfMonth(today).toISOString();
  
  const { data: events = [], isLoading } = useQuery<CalendarEvent[]>({
    queryKey: ['/api/calendar/events', 'current-work', timeMin, timeMax],
    queryFn: () => fetch(`/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`).then(r => r.json()),
    refetchInterval: 60000,
  });

  const todayEvents = events.filter(event => {
    const eventDate = event.start?.dateTime || event.start?.date;
    if (!eventDate) return false;
    return isSameDay(new Date(eventDate), today);
  });

  const formatEventTime = (event: CalendarEvent) => {
    const startTime = event.start?.dateTime;
    const endTime = event.end?.dateTime;
    if (startTime && endTime) {
      return `${format(new Date(startTime), 'h:mm a')} - ${format(new Date(endTime), 'h:mm a')}`;
    }
    return 'All day';
  };

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-primary" />
            <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
              Today's Work
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">Loading schedule...</div>
        </CardContent>
      </Card>
    );
  }

  if (todayEvents.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20" style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)" }}>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Cpu className="w-6 h-6 text-primary" />
          <CardTitle className="font-display tracking-wider" style={{ color: "hsl(187 100% 50%)" }}>
            Today's Work
          </CardTitle>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          Live from Calendar
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayEvents.map(event => (
          <div 
            key={event.id} 
            className="p-3 rounded-lg bg-background/50 border border-primary/20"
            data-testid={`card-current-work-${event.id}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-1 h-full min-h-[40px] bg-primary rounded-full shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-semibold" style={{ color: "hsl(187 100% 50%)" }}>
                  {event.summary}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{formatEventTime(event)}</span>
                </div>
                {event.description && (
                  <p className="mt-2 text-sm text-foreground/70 line-clamp-3">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
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
              <CurrentWorkFromCalendar />
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
