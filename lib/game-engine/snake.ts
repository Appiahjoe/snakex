import type { Direction, Position } from "@/types/game";

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export function canChangeDirection(
  current: Direction,
  next: Direction
): boolean {
  return OPPOSITE[current] !== next;
}

export function getNextHead(
  head: Position,
  direction: Direction
): Position {
  switch (direction) {
    case "up":
      return { x: head.x, y: head.y - 1 };
    case "down":
      return { x: head.x, y: head.y + 1 };
    case "left":
      return { x: head.x - 1, y: head.y };
    case "right":
      return { x: head.x + 1, y: head.y };
  }
}

export function createInitialSnake(): Position[] {
  const cx = Math.floor(10);
  const cy = Math.floor(10);
  return [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];
}

export const INITIAL_DIRECTION: Direction = "right";
