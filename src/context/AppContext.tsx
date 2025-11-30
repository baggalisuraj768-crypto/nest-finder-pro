import React, { createContext, useContext, ReactNode } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";
import { useAuth } from "@/hooks/useAuth";

interface AppContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  compareCount: number;
  canAddMore: boolean;
  user: { name: string; email: string } | null;
  isAuthenticated: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const favoritesHook = useFavorites();
  const compareHook = useCompare();
  const authHook = useAuth();

  return (
    <AppContext.Provider
      value={{
        ...favoritesHook,
        ...compareHook,
        ...authHook,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
