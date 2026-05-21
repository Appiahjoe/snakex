import type { Position } from "@/types/game";
import { CELL_COUNT } from "@/types/game";
import { positionsEqual } from "./collision";

export function randomFoodPosition(snake: Position[]): Position {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  const free: Position[] = [];

  for (let y = 0; y < CELL_COUNT; y++) {
    for (let x = 0; x < CELL_COUNT; x++) {
      if (!occupied.has(`${x},${y}`)) {
        free.push({ x, y });
      }
    }
  }

  if (free.length === 0) {
    return { x: 0, y: 0 };
  }

  return free[Math.floor(Math.random() * free.length)];
}

export function isFoodEaten(head: Position, food: Position): boolean {
  return positionsEqual(head, food);
}
