import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

export function useAuth() {
  const { toast } = useToast();
  const syncAttempted = useRef(false);
  
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const updateUserTypeMutation = useMutation({
    mutationFn: async (userType: "personal" | "enterprise") => {
      const response = await apiRequest("PATCH", "/api/auth/user/type", { userType });
      return response.json();
    },
    onSuccess: () => {
      localStorage.removeItem("pendingUserType");
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to save preference",
        description: "Please update your user type in the chat settings.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (user && !isLoading && !syncAttempted.current) {
      const pendingUserType = localStorage.getItem("pendingUserType") as "personal" | "enterprise" | null;
      
      if (pendingUserType && (pendingUserType === "personal" || pendingUserType === "enterprise")) {
        syncAttempted.current = true;
        
        if (user.userType !== pendingUserType) {
          updateUserTypeMutation.mutate(pendingUserType);
        } else {
          localStorage.removeItem("pendingUserType");
        }
      }
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (!user && !isLoading) {
      syncAttempted.current = false;
    }
  }, [user, isLoading]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
  };
}
