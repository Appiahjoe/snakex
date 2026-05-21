"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useGameStore } from "@/store/gameStore";
import Link from "next/link";

export function PauseOverlay() {
  const status = useGameStore((s) => s.status);
  const resume = useGameStore((s) => s.resume);
  const reset = useGameStore((s) => s.reset);

  return (
    <AnimatePresence>
      {status === "paused" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glass-panel p-8 text-center max-w-sm w-full"
          >
            <h2 className="text-2xl font-bold mb-6">Paused</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={resume} size="lg">
                Continue
              </Button>
              <Link
                href="/"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--accent)]/40 px-5 py-2.5 font-semibold hover:bg-[var(--accent)]/10"
              >
                Quit to Menu
              </Link>
            </div>
            <p className="mt-4 text-sm opacity-50">Space or Esc to resume</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
