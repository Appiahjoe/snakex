"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Difficulty, ThemeId } from "@/types/game";

interface SettingsState {
  themeId: ThemeId;
  difficulty: Difficulty;
  soundEnabled: boolean;
  musicEnabled: boolean;
  highScore: number;
  playerName: string;
  setTheme: (id: ThemeId) => void;
  setDifficulty: (d: Difficulty) => void;
  setSoundEnabled: (v: boolean) => void;
  setMusicEnabled: (v: boolean) => void;
  setHighScore: (score: number) => void;
  setPlayerName: (name: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeId: "neon",
      difficulty: "medium",
      soundEnabled: true,
      musicEnabled: true,
      highScore: 0,
      playerName: "Player",
      setTheme: (themeId) => set({ themeId }),
      setDifficulty: (difficulty) => set({ difficulty }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setMusicEnabled: (musicEnabled) => set({ musicEnabled }),
      setHighScore: (highScore) => set({ highScore }),
      setPlayerName: (playerName) => set({ playerName }),
    }),
    { name: "snakex-settings" }
  )
);
