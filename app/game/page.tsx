"use client";

import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { GameCanvas } from "@/components/game/GameCanvas";
import { GameHUD } from "@/components/game/GameHUD";
import { PauseOverlay } from "@/components/game/PauseOverlay";
import { GameOverOverlay, useGameOverHighScore } from "@/components/game/GameOverOverlay";
import { Nav } from "@/components/layout/Nav";
import { Button } from "@/components/ui/Button";
import { useGameStore } from "@/store/gameStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useGameLoop } from "@/hooks/useGameLoop";
import { playSound, startMusic, stopMusic } from "@/lib/audio";

export default function GamePage() {
  const status = useGameStore((s) => s.status);
  const initGame = useGameStore((s) => s.initGame);
  const pause = useGameStore((s) => s.pause);
  const reset = useGameStore((s) => s.reset);
  const difficulty = useSettingsStore((s) => s.difficulty);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const musicEnabled = useSettingsStore((s) => s.musicEnabled);
  const updateHighScore = useGameOverHighScore();

  const start = useCallback(() => {
    reset();
    initGame(difficulty);
    if (musicEnabled) startMusic(true);
  }, [reset, initGame, difficulty, musicEnabled]);

  useEffect(() => {
    if (status === "idle") start();
    return () => stopMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  useGameLoop(
    () => playSound("eat", soundEnabled),
    () => {
      playSound("gameover", soundEnabled);
      stopMusic();
      const score = useGameStore.getState().engine?.score ?? 0;
      updateHighScore(score);
    }
  );

  const handleRestart = () => {
    start();
  };

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg text-center mb-2"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          Snake<span className="text-[var(--accent)]">X</span>
        </h1>
      </motion.header>

      <Nav />
      <GameHUD />

      <GameCanvas />

      <div className="mt-6 flex gap-3">
        {status === "playing" && (
          <Button variant="secondary" onClick={pause}>
            Pause
          </Button>
        )}
      </div>

      <p className="mt-4 text-xs opacity-40 text-center max-w-sm">
        Arrow keys / WASD · Swipe on mobile · Space to pause
      </p>

      <PauseOverlay />
      <GameOverOverlay onRestart={handleRestart} />
    </div>
  );
}
