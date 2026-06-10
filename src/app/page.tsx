import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { FlipCard } from "@/components/ui/FlipCard";
import { featuredProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured projects */}
      <section id="featured" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[rgb(var(--neon-cyan))]">
                Selected work
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                Featured projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-fg-muted transition-colors hover:text-fg sm:inline-flex"
            >
              All projects
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, idx) => (
            <Reveal key={p.slug} delay={idx * 0.08}>
              <FlipCard project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted transition-colors hover:text-fg sm:hidden"
          >
            All projects
            <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Reveal>
          <GlassCard gradient className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[rgb(var(--neon-violet))]">
                About
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg">
                Engineering with real-world impact.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-base leading-relaxed text-fg-muted">
                I&apos;m Daniel, a software developer and data analyst who builds data-driven web and
                mobile apps — often with AI at the core. I care about clean
                architecture, performance, and shipping things people actually use.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-[rgb(var(--neon-violet))]"
              >
                More about me
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="glass-strong gradient-border relative overflow-hidden rounded-3xl px-8 py-16 text-center md:py-20">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[rgb(var(--neon-violet)/0.25)] via-transparent to-[rgb(var(--neon-pink)/0.2)]" />
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
              Have something in mind? Let&apos;s build it.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fg-muted">
              I&apos;m currently open to new projects and collaborations.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--neon-violet)/0.2)] px-7 py-3.5 text-sm font-semibold text-fg transition-shadow hover:glow-violet"
            >
              Start a conversation
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
