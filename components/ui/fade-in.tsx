"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  className?: string;
}

/**
 * Subtle scroll-reveal used sparingly (heroes, result panels).
 * Respects prefers-reduced-motion and animates only once.
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
