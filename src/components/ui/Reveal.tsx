"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/**
 * Мягкое появление при прокрутке. Контент виден без JS (см. .no-js в globals.css),
 * а при prefers-reduced-motion MotionConfig отключает смещение.
 */
export function Reveal({ delay = 0, y = 22, children, ...rest }: Props) {
  return (
    <motion.div
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
