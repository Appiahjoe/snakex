import type { Position } from "@/types/game";
import { CELL_COUNT } from "@/types/game";

export function isWallCollision(pos: Position): boolean {
  return (
    pos.x < 0 || pos.y < 0 || pos.x >= CELL_COUNT || pos.y >= CELL_COUNT
  );
}

export function isSelfCollision(
  head: Position,
  body: Position[],
  skipTail = true
): boolean {
  const segments = skipTail ? body.slice(0, -1) : body;
  return segments.some((s) => s.x === head.x && s.y === head.y);
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}
