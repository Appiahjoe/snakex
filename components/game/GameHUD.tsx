"use client";

import { useGameStore } from "@/store/gameStore";
import { useSettingsStore } from "@/store/settingsStore";

export function GameHUD() {
  const score = useGameStore((s) => s.engine?.score ?? 0);
  const highScore = useSettingsStore((s) => s.highScore);
  const difficulty = useSettingsStore((s) => s.difficulty);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-md mx-auto mb-4">
      <div className="glass-stat">
        <span className="text-xs uppercase tracking-wider opacity-60">Score</span>
        <span className="text-2xl font-bold text-[var(--accent)]">{score}</span>
      </div>
      <div className="glass-stat">
        <span className="text-xs uppercase tracking-wider opacity-60">Best</span>
        <span className="text-2xl font-bold">{highScore}</span>
      </div>
      <div className="glass-stat">
        <span className="text-xs uppercase tracking-wider opacity-60">Mode</span>
        <span className="text-lg font-semibold capitalize">{difficulty}</span>
      </div>
    </div>
  );
}
