import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, Building2, User, Bot, RefreshCw, LogIn, AlertCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage, User as UserType } from "@shared/schema";

export function ChatInterface() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [selectedUserType, setSelectedUserType] = useState<"personal" | "enterprise">("personal");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.userType) {
      setSelectedUserType(user.userType);
    }
  }, [user]);

  const { data: messages = [], isLoading: messagesLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/messages"],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/chat/messages", {
        content,
        role: "user",
        userType: isAuthenticated ? user?.userType : selectedUserType,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const clearMessagesMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/chat/messages");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
      toast({
        title: "Chat cleared",
        description: "Your conversation history has been cleared",
      });
    },
  });

  const updateUserTypeMutation = useMutation({
    mutationFn: async (userType: "personal" | "enterprise") => {
      const response = await apiRequest("PATCH", "/api/auth/user/type", { userType });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "User type updated",
        description: "Your preference has been saved",
      });
    },
    onError: () => {
      toast({
        title: "Failed to update user type",
        description: "Your preference couldn't be saved. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      const scrollArea = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sendMessageMutation.isPending) return;
    const message = inputValue;
    setInputValue("");
    sendMessageMutation.mutate(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    clearMessagesMutation.mutate();
  };

  const handleUserTypeChange = (type: "personal" | "enterprise") => {
    setSelectedUserType(type);
    if (isAuthenticated) {
      updateUserTypeMutation.mutate(type);
    }
  };

  const currentUserType = isAuthenticated ? (user?.userType ?? "personal") : selectedUserType;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full lg:w-1/2">
            <h2
              className="font-display text-2xl lg:text-3xl font-bold tracking-wider mb-4"
              style={{
                color: "hsl(187 100% 50%)",
                textShadow: "0 0 10px hsl(187 100% 50% / 0.5)",
              }}
              data-testid="text-chat-title"
            >
              Kiearan AI Assistant
            </h2>
            <p className="text-muted-foreground font-heading tracking-wide mb-6" data-testid="text-chat-description">
              {isAuthenticated 
                ? `Welcome back! You're chatting as ${currentUserType === "enterprise" ? "an Enterprise" : "a Personal"} user.`
                : "Select your user type to personalize Kiearan's responses. Log in to save your preference."}
            </p>

            <div className="space-y-4">
              <div
                className="p-4 rounded-md"
                style={{
                  background: "hsl(200 25% 8% / 0.8)",
                  border: "1px solid hsl(187 100% 50% / 0.2)",
                }}
              >
                <h4 className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-3">
                  Select User Type
                </h4>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleUserTypeChange("personal")}
                    className={`flex items-center gap-3 p-3 rounded-md transition-all ${
                      currentUserType === "personal"
                        ? "bg-primary/20 border border-primary/50"
                        : "bg-muted/20 border border-border/30 hover:border-primary/30"
                    }`}
                    data-testid="button-user-type-personal"
                  >
                    <User className={`w-5 h-5 ${currentUserType === "personal" ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className={`font-medium ${currentUserType === "personal" ? "text-primary" : "text-foreground"}`}>
                        Personal User
                      </p>
                      <p className="text-xs text-muted-foreground">Friendly, casual conversation style</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleUserTypeChange("enterprise")}
                    className={`flex items-center gap-3 p-3 rounded-md transition-all ${
                      currentUserType === "enterprise"
                        ? "bg-primary/20 border border-primary/50"
                        : "bg-muted/20 border border-border/30 hover:border-primary/30"
                    }`}
                    data-testid="button-user-type-enterprise"
                  >
                    <Building2 className={`w-5 h-5 ${currentUserType === "enterprise" ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className={`font-medium ${currentUserType === "enterprise" ? "text-primary" : "text-foreground"}`}>
                        Enterprise User
                      </p>
                      <p className="text-xs text-muted-foreground">Professional, detailed technical responses</p>
                    </div>
                  </button>
                </div>

                {!isAuthenticated && !authLoading && (
                  <a
                    href="/api/login"
                    className="flex items-center justify-center gap-2 mt-4 p-2 rounded-md bg-primary/10 border border-primary/30 text-primary text-sm hover:bg-primary/20 transition-colors"
                    data-testid="link-login-chat"
                  >
                    <LogIn className="w-4 h-4" />
                    Log in to save your preference
                  </a>
                )}
              </div>
            </div>
          </div>

          <Card
            className="w-full lg:w-1/2 bg-card/80 backdrop-blur-xl border-primary/20 overflow-hidden"
            style={{
              boxShadow: "0 0 30px hsl(187 100% 50% / 0.1)",
            }}
            data-testid="card-chat-interface"
          >
            <CardHeader className="border-b border-border/50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-primary/30">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-display">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-heading font-semibold text-sm" data-testid="text-assistant-name">
                      Kiearan
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentUserType === "enterprise" ? "Enterprise Mode" : "Personal Mode"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`border-primary/50 ${
                      currentUserType === "enterprise" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted/30 text-muted-foreground"
                    }`}
                    style={{ boxShadow: currentUserType === "enterprise" ? "0 0 10px hsl(187 100% 50% / 0.2)" : "none" }}
                  >
                    {currentUserType === "enterprise" ? (
                      <>
                        <Building2 className="w-3 h-3 mr-1" />
                        Enterprise
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 mr-1" />
                        Personal
                      </>
                    )}
                  </Badge>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleClearChat}
                    disabled={clearMessagesMutation.isPending}
                    className="h-8 w-8"
                    data-testid="button-clear-chat"
                  >
                    <RefreshCw className={`w-4 h-4 ${clearMessagesMutation.isPending ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="h-80 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messagesLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-16 w-3/4 bg-muted/50" />
                      <Skeleton className="h-12 w-2/3 ml-auto bg-primary/10" />
                      <Skeleton className="h-14 w-3/4 bg-muted/50" />
                    </div>
                  ) : (
                    <>
                      {messages.length === 0 && (
                        <div className="flex justify-start">
                          <div className="max-w-[85%] rounded-md px-4 py-3 bg-muted/50 border border-border/50">
                            <p className="text-xs font-semibold text-primary mb-1">Kiearan:</p>
                            <p className="text-sm">
                              {currentUserType === "enterprise"
                                ? "Welcome to the Luthor.Tech enterprise consultation. How may I assist your organization today?"
                                : "Hey there! I'm Kiearan. What would you like to explore in the Luthor.Tech ecosystem?"}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-md px-4 py-3 ${
                              message.role === "user"
                                ? "bg-primary/20 border border-primary/30"
                                : "bg-muted/50 border border-border/50"
                            }`}
                            data-testid={`message-${message.role}-${message.id}`}
                          >
                            {message.role === "assistant" && (
                              <p className="text-xs font-semibold text-primary mb-1">Kiearan:</p>
                            )}
                            {message.role === "user" && (
                              <p className="text-xs font-semibold text-muted-foreground mb-1">You:</p>
                            )}
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      
                      {sendMessageMutation.isPending && (
                        <div className="flex justify-start">
                          <div className="bg-muted/50 border border-border/50 rounded-md px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border/50">
                <div className="flex items-end gap-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message... (Shift+Enter = newline)"
                    className="min-h-[44px] max-h-32 resize-none bg-muted/30 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
                    data-testid="input-chat-message"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || sendMessageMutation.isPending}
                    className="shrink-0 bg-primary text-primary-foreground"
                    style={{
                      boxShadow: inputValue.trim() ? "0 0 15px hsl(187 100% 50% / 0.4)" : "none",
                    }}
                    data-testid="button-send-message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
