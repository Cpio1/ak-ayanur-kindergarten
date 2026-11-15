"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; distance?: number; duration?: number; delay?: number; rotate?: number };

/** Медленное «парение» декоративных элементов. Отключается при reduced motion. */
export function Float({ children, className = "", distance = 8, duration = 6, delay = 0, rotate = 0 }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      animate={reduce ? undefined : { y: [0, -distance, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
