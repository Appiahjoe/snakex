"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useGameStore } from "@/store/gameStore";
import { useSettingsStore } from "@/store/settingsStore";
import { saveLocalScore } from "@/lib/leaderboard";

interface GameOverOverlayProps {
  onRestart: () => void;
}

export function GameOverOverlay({ onRestart }: GameOverOverlayProps) {
  const status = useGameStore((s) => s.status);
  const score = useGameStore((s) => s.engine?.score ?? 0);
  const playerName = useSettingsStore((s) => s.playerName);
  const difficulty = useSettingsStore((s) => s.difficulty);
  const highScore = useSettingsStore((s) => s.highScore);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    saveLocalScore(playerName, score, difficulty, "alltime");
    try {
      await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: playerName,
          score,
          difficulty,
          period: "alltime",
        }),
      });
    } catch {
      /* offline ok */
    }
    setSaved(true);
  };

  return (
    <AnimatePresence>
      {status === "gameover" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-panel p-8 text-center max-w-sm w-full"
          >
            <h2 className="text-3xl font-bold text-[var(--accent)] mb-2">Game Over</h2>
            <p className="text-5xl font-black mb-2">{score}</p>
            <p className="text-sm opacity-60 mb-6">
              {score >= highScore ? "New high score!" : `Best: ${highScore}`}
            </p>
            <div className="flex flex-col gap-3">
              {!saved ? (
                <Button onClick={handleSave} size="lg">
                  Save Score
                </Button>
              ) : (
                <p className="text-sm text-[var(--accent)]">Score saved!</p>
              )}
              <Button variant="secondary" onClick={onRestart}>
                Play Again
              </Button>
              <Link
                href="/leaderboard"
                className="py-2 text-[var(--text)]/80 hover:text-[var(--text)]"
              >
                Leaderboard
              </Link>
              <Link href="/" className="py-2 text-[var(--text)]/80 hover:text-[var(--text)]">
                Home
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useGameOverHighScore() {
  const setHighScore = useSettingsStore((s) => s.setHighScore);
  const highScore = useSettingsStore((s) => s.highScore);

  return (score: number) => {
    if (score > highScore) setHighScore(score);
  };
}
