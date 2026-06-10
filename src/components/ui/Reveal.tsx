"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** HTML tag to render. Defaults to div. */
  as?: "div" | "section" | "span" | "li";
};

/** Fades + lifts its children into view the first time they're scrolled to. */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.5, 0.2, 1] as const }}
    >
      {children}
    </MotionTag>
  );
}
