import type { Accent } from "@/lib/projects";

/** Tailwind helpers mapped to each accent colour. */
export const accentMap: Record<
  Accent,
  { text: string; gradient: string; chip: string; glow: "violet" | "pink" | "cyan" }
> = {
  violet: {
    text: "text-[rgb(var(--neon-violet))]",
    gradient: "from-[rgb(var(--neon-violet)/0.55)] to-[rgb(var(--neon-pink)/0.35)]",
    chip: "bg-[rgb(var(--neon-violet)/0.15)]",
    glow: "violet",
  },
  pink: {
    text: "text-[rgb(var(--neon-pink))]",
    gradient: "from-[rgb(var(--neon-pink)/0.55)] to-[rgb(var(--neon-violet)/0.35)]",
    chip: "bg-[rgb(var(--neon-pink)/0.15)]",
    glow: "pink",
  },
  cyan: {
    text: "text-[rgb(var(--neon-cyan))]",
    gradient: "from-[rgb(var(--neon-cyan)/0.55)] to-[rgb(var(--neon-blue)/0.35)]",
    chip: "bg-[rgb(var(--neon-cyan)/0.15)]",
    glow: "cyan",
  },
  blue: {
    text: "text-[rgb(var(--neon-blue))]",
    gradient: "from-[rgb(var(--neon-blue)/0.55)] to-[rgb(var(--neon-cyan)/0.35)]",
    chip: "bg-[rgb(var(--neon-blue)/0.15)]",
    glow: "cyan",
  },
};
