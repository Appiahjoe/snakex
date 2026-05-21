import { NextRequest, NextResponse } from "next/server";
import type { Difficulty, LeaderboardEntry } from "@/types/game";

const scores: LeaderboardEntry[] = [];

function isValidScore(score: unknown): score is number {
  return typeof score === "number" && Number.isFinite(score) && score >= 0 && score <= 999999;
}

function isValidDifficulty(d: unknown): d is Difficulty {
  return d === "easy" || d === "medium" || d === "hard" || d === "extreme";
}

export async function GET(request: NextRequest) {
  const period = request.nextUrl.searchParams.get("period") ?? "alltime";
  let list = [...scores].sort((a, b) => b.score - a.score);

  if (period === "daily") {
    const today = new Date().toDateString();
    list = list.filter(
      (e) => new Date(e.createdAt).toDateString() === today
    );
  }

  return NextResponse.json({ entries: list.slice(0, 20) });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "Player").slice(0, 20).trim() || "Player";
    const score = body.score;
    const difficulty = body.difficulty;
    const period = body.period === "daily" ? "daily" : "alltime";

    if (!isValidScore(score) || !isValidDifficulty(difficulty)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const entry: LeaderboardEntry = {
      id: crypto.randomUUID(),
      name,
      score,
      difficulty,
      createdAt: new Date().toISOString(),
      period,
    };

    scores.push(entry);
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 100) scores.length = 100;

    return NextResponse.json({ entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
