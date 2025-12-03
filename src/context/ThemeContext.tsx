"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getThemeColors } from "@/lib/themeUtils";

interface ThemeContextType {
  themeColors: ReturnType<typeof getThemeColors>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const themeColors = getThemeColors(user?.user_type);

  // Apply theme to body element for CSS variables
  useEffect(() => {
    if (user?.user_type) {
      document.body.setAttribute("data-user-role", user.user_type);
    } else {
      document.body.removeAttribute("data-user-role");
    }
  }, [user?.user_type]);

  return (
    <ThemeContext.Provider value={{ themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
