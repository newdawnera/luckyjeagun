"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/** A drifting, blurred neon orb that also parallaxes with the pointer. */
function Orb({
  className,
  parX,
  parY,
  drift,
  duration,
  animate = true,
}: {
  className: string;
  parX: MotionValue<number>;
  parY: MotionValue<number>;
  drift: { x: number[]; y: number[] };
  duration: number;
  animate?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      style={{ x: parX, y: parY }}
      className={`absolute rounded-full blur-3xl mix-blend-screen ${className}`}
    >
      <motion.div
        className="h-full w-full rounded-full"
        style={{ background: "inherit" }}
        animate={animate ? { x: drift.x, y: drift.y, scale: [1, 1.12, 1] } : undefined}
        transition={
          animate
            ? {
                duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }
            : undefined
        }
      />
    </motion.div>
  );
}

/**
 * True on small screens or when the user prefers reduced motion.
 * Used to cut GPU-heavy effects (orb drift, parallax, extra orbs)
 * on low-end phones, where they cause scroll jank.
 */
function useReducedEffects() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    const update = () => setReduced(queries.some((q) => q.matches));
    update();
    queries.forEach((q) => q.addEventListener("change", update));
    return () =>
      queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return reduced;
}

export function AnimatedBackground() {
  const reduceEffects = useReducedEffects();

  // Normalised pointer position (-0.5 .. 0.5)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduceEffects) return; // skip pointer parallax on phones / reduced motion
    const handle = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, [px, py, reduceEffects]);

  // Parallax offsets at different depths (hooks called unconditionally at top level)
  const o1x = useTransform(sx, (v) => v * 60);
  const o1y = useTransform(sy, (v) => v * 60);
  const o2x = useTransform(sx, (v) => v * -90);
  const o2y = useTransform(sy, (v) => v * -90);
  const o3x = useTransform(sx, (v) => v * 45);
  const o3y = useTransform(sy, (v) => v * 45);
  const o4x = useTransform(sx, (v) => v * -50);
  const o4y = useTransform(sy, (v) => v * -50);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Orb
        className="left-[-10%] top-[-8%] h-[42vw] w-[42vw] bg-[rgb(var(--neon-violet)/0.55)]"
        parX={o1x}
        parY={o1y}
        drift={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        duration={18}
        animate={!reduceEffects}
      />
      {!reduceEffects && (
        <Orb
          className="right-[-8%] top-[10%] h-[36vw] w-[36vw] bg-[rgb(var(--neon-pink)/0.5)]"
          parX={o2x}
          parY={o2y}
          drift={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          duration={22}
        />
      )}
      <Orb
        className="bottom-[-12%] left-[20%] h-[40vw] w-[40vw] bg-[rgb(var(--neon-cyan)/0.45)]"
        parX={o3x}
        parY={o3y}
        drift={{ x: [0, 30, -40, 0], y: [0, -20, 30, 0] }}
        duration={26}
        animate={!reduceEffects}
      />
      {!reduceEffects && (
        <Orb
          className="bottom-[5%] right-[12%] h-[28vw] w-[28vw] bg-[rgb(var(--neon-blue)/0.4)]"
          parX={o4x}
          parY={o4y}
          drift={{ x: [0, -25, 20, 0], y: [0, 25, -15, 0] }}
          duration={20}
        />
      )}

      {/* Soft vignette keeps edges grounded and text legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(var(--bg)/0.65)_100%)]" />
    </div>
  );
}
