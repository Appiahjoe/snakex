"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Nav } from "@/components/layout/Nav";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSettingsStore } from "@/store/settingsStore";

export default function HomePage() {
  const highScore = useSettingsStore((s) => s.highScore);
  const playerName = useSettingsStore((s) => s.playerName);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.h1
          className="text-6xl sm:text-7xl font-black tracking-tighter mb-2"
          animate={{
            textShadow: [
              "0 0 20px var(--glow)",
              "0 0 40px var(--glow)",
              "0 0 20px var(--glow)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Snake<span className="text-[var(--accent)]">X</span>
        </motion.h1>
        <p className="text-lg opacity-70 mb-8">
          Modern arcade snake — smooth, responsive, neon-powered.
        </p>

        <GlassCard className="p-6 mb-8">
          <p className="text-sm opacity-50">Welcome back</p>
          <p className="text-xl font-semibold">{playerName}</p>
          <p className="mt-2 text-3xl font-bold text-[var(--accent)]">
            {highScore}
          </p>
          <p className="text-xs opacity-40">personal best</p>
        </GlassCard>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/game">
            <Button size="lg" className="w-full sm:w-auto min-w-[180px]">
              Start Game
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Leaderboard
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="mt-12 w-full max-w-md">
        <Nav />
      </div>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 grid grid-cols-2 gap-3 text-sm opacity-50 max-w-md w-full"
      >
        {[
          "5 themes",
          "4 difficulties",
          "Touch & keyboard",
          "Local + API scores",
        ].map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="text-[var(--accent)]">◆</span> {f}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
