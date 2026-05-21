# SnakeX — Modern Snake Game

A modern snake arcade game built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Canvas**, **Zustand**, and **Framer Motion**.

## Features

- Smooth Canvas-based gameplay at 60 FPS rendering
- 4 difficulty levels (Easy → Extreme) with progressive speed
- 5 visual themes (Neon, Retro, Minimal Dark, Light, Matrix)
- Keyboard (arrows / WASD) and mobile (swipe + on-screen D-pad)
- Score multiplier, pause/resume, game-over flow
- Local + API leaderboard (daily / all-time)
- Web Audio sound effects and optional background music
- Persistent settings via Zustand + localStorage

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description          |
| -------------- | -------------------- |
| `npm run dev`  | Development server   |
| `npm run build`| Production build     |
| `npm run start`| Production server    |
| `npm run lint` | ESLint               |

## Project Structure

```
app/              # Pages (home, game, leaderboard, settings, API)
components/       # UI, game canvas, layout
hooks/            # Game loop, controls
lib/              # Game engine, themes, audio, leaderboard
store/            # Zustand stores
types/            # Shared TypeScript types
```

## Deploy

Deploy to [Vercel](https://vercel.com) — the default choice for Next.js apps.

## Controls

| Platform | Input                          |
| -------- | ------------------------------ |
| Desktop  | Arrow keys, WASD, Space/Esc    |
| Mobile   | Swipe, on-screen direction pad |
