"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Direction } from "@/types/game";
import { useGameStore } from "@/store/gameStore";

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  W: "up",
  s: "down",
  S: "down",
  a: "left",
  A: "left",
  d: "right",
  D: "right",
};

export function useGameControls(enabled: boolean) {
  const setDirection = useGameStore((s) => s.setDirection);
  const pause = useGameStore((s) => s.pause);
  const resume = useGameStore((s) => s.resume);
  const status = useGameStore((s) => s.status);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        if (status === "playing") pause();
        else if (status === "paused") resume();
        return;
      }
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        setDirection(dir);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, setDirection, pause, resume, status]);

  const onTouchStart = useCallback((clientX: number, clientY: number) => {
    touchStart.current = { x: clientX, y: clientY };
  }, []);

  const onTouchEnd = useCallback(
    (clientX: number, clientY: number) => {
      if (!touchStart.current || !enabled) return;
      const dx = clientX - touchStart.current.x;
      const dy = clientY - touchStart.current.y;
      touchStart.current = null;
      const minSwipe = 30;
      if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? "right" : "left");
      } else {
        setDirection(dy > 0 ? "down" : "up");
      }
    },
    [enabled, setDirection]
  );

  return { onTouchStart, onTouchEnd };
}
