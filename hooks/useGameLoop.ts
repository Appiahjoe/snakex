"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";

export function useGameLoop(
  onTick?: () => void,
  onGameOver?: () => void
) {
  const status = useGameStore((s) => s.status);
  const engine = useGameStore((s) => s.engine);
  const advance = useGameStore((s) => s.advance);
  const prevScore = useRef(0);

  useEffect(() => {
    if (status !== "playing" || !engine) return;

    const id = window.setInterval(() => {
      advance();
    }, engine.speedMs);

    return () => clearInterval(id);
  }, [status, engine?.speedMs, advance]);

  useEffect(() => {
    if (!engine) return;
    if (engine.score > prevScore.current) {
      onTick?.();
    }
    prevScore.current = engine.score;
  }, [engine?.score, engine, onTick]);

  useEffect(() => {
    if (status === "gameover") {
      onGameOver?.();
    }
  }, [status, onGameOver]);
}
