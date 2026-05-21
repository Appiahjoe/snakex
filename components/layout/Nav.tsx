"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/game", label: "Play" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/settings", label: "Settings" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 p-2">
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className="relative px-3 py-2 text-sm font-medium">
            {active && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)]/30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${active ? "text-[var(--accent)]" : "text-[var(--text)]/70 hover:text-[var(--text)]"}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
