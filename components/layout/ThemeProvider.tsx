"use client";

import { useEffect } from "react";
import { THEMES } from "@/lib/themes";
import { useSettingsStore } from "@/store/settingsStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeId = useSettingsStore((s) => s.themeId);
  const theme = THEMES[themeId];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--grid", theme.grid);
    root.style.setProperty("--snake-head", theme.snakeHead);
    root.style.setProperty("--snake-body", theme.snakeBody);
    root.style.setProperty("--food", theme.food);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--glow", theme.glow);
  }, [theme]);

  return (
    <div
      className="min-h-full flex flex-col"
      style={{ background: theme.bg, color: theme.text }}
    >
      {children}
    </div>
  );
}
