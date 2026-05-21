"use client";

import { motion } from "framer-motion";
import { playSound } from "@/lib/audio";
import { useSettingsStore } from "@/store/settingsStore";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--bg)] hover:brightness-110 shadow-[0_0_20px_var(--glow)]",
    secondary:
      "border border-[var(--accent)]/40 text-[var(--text)] hover:bg-[var(--accent)]/10",
    ghost: "text-[var(--text)]/80 hover:text-[var(--text)] hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <motion.span
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="inline-block"
    >
      <button
        type={type}
        disabled={disabled}
        className={`rounded-xl font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={(e) => {
          playSound("click", soundEnabled);
          onClick?.(e);
        }}
      >
        {children}
      </button>
    </motion.span>
  );
}
