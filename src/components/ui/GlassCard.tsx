"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLMotionProps<"div"> & {
  /** Add a hover glow in the given accent colour. */
  glow?: "violet" | "pink" | "cyan" | "none";
  /** Show the animated gradient ring border. */
  gradient?: boolean;
};

export function GlassCard({
  className,
  glow = "none",
  gradient = false,
  children,
  ...props
}: GlassCardProps) {
  const glowClass =
    glow === "violet"
      ? "hover:glow-violet"
      : glow === "pink"
        ? "hover:glow-pink"
        : glow === "cyan"
          ? "hover:glow-cyan"
          : "";

  return (
    <motion.div
      className={cn(
        "glass rounded-3xl transition-shadow duration-500",
        gradient && "gradient-border",
        glowClass,
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
