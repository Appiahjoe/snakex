"use client";

import { motion } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSettingsStore } from "@/store/settingsStore";
import { THEME_LIST } from "@/lib/themes";
import type { Difficulty } from "@/types/game";

const DIFFICULTIES: { id: Difficulty; label: string; desc: string }[] = [
  { id: "easy", label: "Easy", desc: "Slow — beginner friendly" },
  { id: "medium", label: "Medium", desc: "Moderate — standard" },
  { id: "hard", label: "Hard", desc: "Fast — advanced" },
  { id: "extreme", label: "Extreme", desc: "Very fast — competitive" },
];

export default function SettingsPage() {
  const {
    themeId,
    difficulty,
    soundEnabled,
    musicEnabled,
    playerName,
    highScore,
    setTheme,
    setDifficulty,
    setSoundEnabled,
    setMusicEnabled,
    setPlayerName,
  } = useSettingsStore();

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 max-w-lg mx-auto w-full">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-2"
      >
        Settings
      </motion.h1>
      <Nav />

      <div className="w-full mt-8 space-y-6">
        <GlassCard className="p-4">
          <label className="block text-sm opacity-60 mb-2">Player name</label>
          <input
            type="text"
            maxLength={20}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:outline-none focus:border-[var(--accent)]"
          />
          <p className="mt-2 text-xs opacity-40">High score: {highScore}</p>
        </GlassCard>

        <GlassCard className="p-4">
          <h2 className="text-sm font-semibold opacity-60 mb-3">Difficulty</h2>
          <div className="space-y-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id)}
                className={`w-full text-left rounded-lg px-4 py-3 transition-colors ${
                  difficulty === d.id
                    ? "bg-[var(--accent)]/15 border border-[var(--accent)]/40"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">{d.label}</span>
                <span className="block text-xs opacity-50">{d.desc}</span>
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <h2 className="text-sm font-semibold opacity-60 mb-3">Theme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {THEME_LIST.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`rounded-lg px-3 py-2 text-sm text-left border transition-colors ${
                  themeId === t.id
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-white/10 bg-white/5"
                }`}
                style={{
                  borderColor: themeId === t.id ? t.accent : undefined,
                }}
              >
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2 align-middle"
                  style={{ background: t.accent }}
                />
                {t.name}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4 space-y-4">
          <h2 className="text-sm font-semibold opacity-60">Audio</h2>
          <Toggle
            label="Sound effects"
            checked={soundEnabled}
            onChange={setSoundEnabled}
          />
          <Toggle
            label="Background music"
            checked={musicEnabled}
            onChange={setMusicEnabled}
          />
        </GlassCard>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? "bg-[var(--accent)]" : "bg-white/20"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </button>
    </label>
  );
}
