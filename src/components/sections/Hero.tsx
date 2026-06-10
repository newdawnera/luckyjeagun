"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sparkles, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { GlassCard } from "@/components/ui/GlassCard";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.21, 0.5, 0.2, 1] as const },
  },
};

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setI((v) => (v + 1) % site.taglines.length),
      2600,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        <motion.div variants={item}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-fg-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--neon-cyan))] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--neon-cyan))]" />
            </span>
            {site.status}
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-7 font-mono text-sm text-fg-muted sm:text-base"
        >
          Hi, I&apos;m{" "}
          <span className="font-semibold text-fg">{site.name}</span>.
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-3 max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl"
        >
          I craft{" "}
          <span className="relative inline-flex min-w-[6ch] justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={site.taglines[i]}
                initial={{ y: "0.5em", opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-0.5em", opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.45 }}
                className="neon-text"
              >
                {site.taglines[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg"
        >
          {site.summary}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/projects"
            className="gradient-border group inline-flex items-center gap-2 rounded-full bg-[rgb(var(--neon-violet)/0.16)] px-6 py-3 text-sm font-semibold text-fg transition-all duration-300 hover:glow-violet"
          >
            View my work
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link
            href="/contact"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-fg transition-colors hover:glow-cyan"
          >
            <Sparkles size={16} className="text-[rgb(var(--neon-cyan))]" />
            Get in touch
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-14 w-full max-w-md">
          <GlassCard glow="violet" gradient className="animate-float p-5 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                  Currently
                </p>
                <p className="mt-1 text-sm font-semibold text-fg">{site.role}</p>
              </div>
              <span className="gradient-border grid h-12 w-12 place-items-center rounded-2xl bg-[rgb(var(--neon-pink)/0.15)] font-mono text-base font-bold text-fg">
                {site.initials}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-[rgb(var(--glass-border)/var(--glass-border-alpha))]" />
            <p className="mt-3 text-xs text-fg-muted">{site.location}</p>
          </GlassCard>
        </motion.div>
      </motion.div>

      <motion.a
        href="#featured"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-fg-muted"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown size={22} />
        </motion.span>
      </motion.a>
    </section>
  );
}
