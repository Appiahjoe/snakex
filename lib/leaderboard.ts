import type { Difficulty, LeaderboardEntry } from "@/types/game";

const LOCAL_KEY = "snakex-leaderboard";

export function getLocalLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalScore(
  name: string,
  score: number,
  difficulty: Difficulty,
  period: "daily" | "alltime" = "alltime"
): LeaderboardEntry {
  const entry: LeaderboardEntry = {
    id: crypto.randomUUID(),
    name: name.slice(0, 20),
    score,
    difficulty,
    createdAt: new Date().toISOString(),
    period,
  };
  const list = [...getLocalLeaderboard(), entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  return entry;
}

export function filterByPeriod(
  entries: LeaderboardEntry[],
  period: "daily" | "alltime"
): LeaderboardEntry[] {
  if (period === "alltime") return entries;
  const today = new Date().toDateString();
  return entries.filter(
    (e) => new Date(e.createdAt).toDateString() === today
  );
}
