import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6">
      <GlassCard glow="violet" className="w-full p-10 text-center sm:p-14">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-[rgb(var(--neon-violet))]">
          Error 404
        </p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-fg sm:text-7xl">
          <span className="neon-text">Lost in space</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-fg-muted">
          This page drifted out of orbit, or never existed. Let&apos;s get you back to
          something solid.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(var(--neon-violet))] to-[rgb(var(--neon-pink))] px-5 py-3 text-sm font-semibold text-white transition hover:glow-violet"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--glass-border))] px-5 py-3 text-sm font-medium text-fg transition hover:bg-[rgb(var(--glass)/0.4)]"
          >
            <Compass className="h-4 w-4" /> Browse {site.name}&apos;s work
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
