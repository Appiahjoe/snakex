"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  filterByPeriod,
  getLocalLeaderboard,
} from "@/lib/leaderboard";
import type { LeaderboardEntry } from "@/types/game";

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"daily" | "alltime">("alltime");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const local = filterByPeriod(getLocalLeaderboard(), period);
      try {
        const res = await fetch(`/api/scores?period=${period}`);
        const data = await res.json();
        const remote = (data.entries ?? []) as LeaderboardEntry[];
        const merged = [...local, ...remote]
          .sort((a, b) => b.score - a.score)
          .slice(0, 20);
        setEntries(merged);
      } catch {
        setEntries(local.slice(0, 20));
      }
      setLoading(false);
    }
    load();
  }, [period]);

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-2"
      >
        Leaderboard
      </motion.h1>
      <Nav />

      <div className="flex gap-2 mt-6 mb-6">
        {(["alltime", "daily"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              period === p
                ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {p === "alltime" ? "All Time" : "Today"}
          </button>
        ))}
      </div>

      <GlassCard className="w-full max-w-md p-4">
        {loading ? (
          <p className="text-center py-8 opacity-60">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-center py-8 opacity-60">
            No scores yet. Play a game and save your score!
          </p>
        ) : (
          <ol className="divide-y divide-white/10">
            {entries.map((entry, i) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 py-3"
              >
                <span
                  className={`w-8 text-center font-bold ${
                    i < 3 ? "text-[var(--accent)]" : "opacity-50"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{entry.name}</p>
                  <p className="text-xs opacity-50 capitalize">
                    {entry.difficulty}
                  </p>
                </div>
                <span className="text-lg font-bold tabular-nums">
                  {entry.score}
                </span>
              </motion.li>
            ))}
          </ol>
        )}
      </GlassCard>
    </div>
  );
}
