"use client";

import { useCallback, useEffect, useRef } from "react";
import { CELL_COUNT } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { useGameControls } from "@/hooks/useGameControls";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useGameStore((s) => s.engine);
  const status = useGameStore((s) => s.status);
  const setDirection = useGameStore((s) => s.setDirection);
  const enabled = status === "playing" || status === "paused";
  const { onTouchStart, onTouchEnd } = useGameControls(enabled);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !engine) return;

    const size = canvas.width;
    const cell = size / CELL_COUNT;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "#0a0a12";
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--grid").trim();
    ctx.lineWidth = 1;
    for (let i = 0; i <= CELL_COUNT; i++) {
      const p = i * cell;
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(size, p);
      ctx.stroke();
    }

    const headColor = getComputedStyle(document.documentElement).getPropertyValue("--snake-head").trim();
    const bodyColor = getComputedStyle(document.documentElement).getPropertyValue("--snake-body").trim();
    const foodColor = getComputedStyle(document.documentElement).getPropertyValue("--food").trim();
    const glow = getComputedStyle(document.documentElement).getPropertyValue("--glow").trim();

    engine.snake.forEach((seg, i) => {
      const pad = 1;
      const x = seg.x * cell + pad;
      const y = seg.y * cell + pad;
      const w = cell - pad * 2;
      ctx.fillStyle = i === 0 ? headColor : bodyColor;
      if (i === 0) {
        ctx.shadowColor = glow;
        ctx.shadowBlur = 12;
      } else {
        ctx.shadowBlur = 0;
      }
      const r = Math.max(2, w * 0.2);
      roundRect(ctx, x, y, w, w, r);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    const pulse = 0.85 + Math.sin(Date.now() / 200) * 0.15;
    const fx = engine.food.x * cell + cell / 2;
    const fy = engine.food.y * cell + cell / 2;
    const fr = (cell / 2 - 2) * pulse;
    ctx.beginPath();
    ctx.arc(fx, fy, fr, 0, Math.PI * 2);
    ctx.fillStyle = foodColor;
    ctx.shadowColor = foodColor;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    void dpr;
  }, [engine]);

  useEffect(() => {
    let frame: number;
    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [draw]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      const max = Math.min(parent?.clientWidth ?? 400, 480);
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${max}px`;
      canvas.style.height = `${max}px`;
      canvas.width = max * dpr;
      canvas.height = max * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className="relative touch-none select-none"
      onTouchStart={(e) => {
        const t = e.touches[0];
        onTouchStart(t.clientX, t.clientY);
      }}
      onTouchEnd={(e) => {
        const t = e.changedTouches[0];
        onTouchEnd(t.clientX, t.clientY);
      }}
    >
      <canvas
        ref={canvasRef}
        className="mx-auto rounded-xl border border-white/10 shadow-[0_0_40px_var(--glow)]"
        aria-label="Snake game board"
        role="img"
      />
      <div className="mt-4 grid grid-cols-3 gap-2 max-w-[200px] mx-auto sm:hidden">
        <div />
        <DirectionBtn label="▲" onPress={() => setDirection("up")} />
        <div />
        <DirectionBtn label="◀" onPress={() => setDirection("left")} />
        <DirectionBtn label="▼" onPress={() => setDirection("down")} />
        <DirectionBtn label="▶" onPress={() => setDirection("right")} />
      </div>
    </div>
  );
}

function DirectionBtn({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      className="h-12 rounded-lg bg-white/10 text-lg font-bold active:bg-white/20"
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      aria-label={`Move ${label}`}
    >
      {label}
    </button>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
