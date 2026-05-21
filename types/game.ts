export type Direction = "up" | "down" | "left" | "right";

export type GameStatus = "idle" | "playing" | "paused" | "gameover";

export type Difficulty = "easy" | "medium" | "hard" | "extreme";

export type ThemeId =
  | "neon"
  | "retro"
  | "minimal-dark"
  | "light"
  | "matrix";

export interface Position {
  x: number;
  y: number;
}

export interface GameTheme {
  id: ThemeId;
  name: string;
  bg: string;
  grid: string;
  snakeHead: string;
  snakeBody: string;
  food: string;
  accent: string;
  text: string;
  glow: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  difficulty: Difficulty;
  createdAt: string;
  period: "daily" | "alltime";
}

export const DIFFICULTY_SPEED: Record<Difficulty, number> = {
  easy: 140,
  medium: 100,
  hard: 70,
  extreme: 45,
};

export const CELL_COUNT = 20;
