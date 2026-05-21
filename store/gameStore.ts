"use client";

import { create } from "zustand";
import type { Direction, GameStatus } from "@/types/game";
import {
  applyDirection,
  createInitialState,
  tick,
  type GameState,
} from "@/lib/game-engine/engine";
import type { Difficulty } from "@/types/game";

interface GameStore {
  status: GameStatus;
  engine: GameState | null;
  initGame: (difficulty: Difficulty) => void;
  setDirection: (dir: Direction) => void;
  advance: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: "idle",
  engine: null,

  initGame: (difficulty) => {
    set({ engine: createInitialState(difficulty), status: "playing" });
  },

  setDirection: (dir) => {
    const { engine, status } = get();
    if (!engine || status !== "playing") return;
    set({ engine: applyDirection(engine, dir) });
  },

  advance: () => {
    const { engine, status } = get();
    if (!engine || status !== "playing") return;
    const next = tick(engine);
    if (next.gameOver) {
      set({ engine: next, status: "gameover" });
    } else {
      set({ engine: next });
    }
  },

  pause: () => {
    if (get().status === "playing") set({ status: "paused" });
  },

  resume: () => {
    if (get().status === "paused") set({ status: "playing" });
  },

  reset: () => set({ status: "idle", engine: null }),
}));
