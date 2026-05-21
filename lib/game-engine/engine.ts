import type { Direction, Difficulty, Position } from "@/types/game";
import { DIFFICULTY_SPEED } from "@/types/game";
import { isFoodEaten, randomFoodPosition } from "./food";
import {
  isSelfCollision,
  isWallCollision,
} from "./collision";
import {
  canChangeDirection,
  createInitialSnake,
  getNextHead,
  INITIAL_DIRECTION,
} from "./snake";

export interface GameState {
  snake: Position[];
  direction: Direction;
  pendingDirection: Direction;
  food: Position;
  score: number;
  foodsEaten: number;
  speedMs: number;
  gameOver: boolean;
}

export function createInitialState(difficulty: Difficulty): GameState {
  const snake = createInitialSnake();
  return {
    snake,
    direction: INITIAL_DIRECTION,
    pendingDirection: INITIAL_DIRECTION,
    food: randomFoodPosition(snake),
    score: 0,
    foodsEaten: 0,
    speedMs: DIFFICULTY_SPEED[difficulty],
    gameOver: false,
  };
}

export function applyDirection(
  state: GameState,
  next: Direction
): GameState {
  if (!canChangeDirection(state.direction, next)) {
    return state;
  }
  return { ...state, pendingDirection: next };
}

export function tick(state: GameState): GameState {
  if (state.gameOver) return state;

  const direction = state.pendingDirection;
  const head = state.snake[0];
  const newHead = getNextHead(head, direction);

  if (isWallCollision(newHead) || isSelfCollision(newHead, state.snake)) {
    return { ...state, direction, gameOver: true };
  }

  const ate = isFoodEaten(newHead, state.food);
  const newSnake = [newHead, ...state.snake];
  if (!ate) {
    newSnake.pop();
  }

  const foodsEaten = ate ? state.foodsEaten + 1 : state.foodsEaten;
  const multiplier = 1 + Math.floor(foodsEaten / 5) * 0.5;
  const points = ate ? Math.round(10 * multiplier) : 0;
  const score = state.score + points;

  let food = state.food;
  if (ate) {
    food = randomFoodPosition(newSnake);
  }

  const speedBoost = ate && foodsEaten % 3 === 0;
  const speedMs = speedBoost
    ? Math.max(35, state.speedMs - 5)
    : state.speedMs;

  return {
    ...state,
    snake: newSnake,
    direction,
    food,
    score,
    foodsEaten,
    speedMs,
  };
}
