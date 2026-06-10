import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Play,
  Check,
} from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { projects, getProject } from "@/lib/projects";
import { accentMap } from "@/lib/accents";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const a = accentMap[project.accent];
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <article className="mx-auto max-w-4xl px-6 pt-36 pb-24">
      <Reveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} />
          All projects
        </Link>
      </Reveal>

      {/* Title block */}
      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium text-fg",
                a.chip,
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-fg sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className={cn("mt-3 text-lg font-medium", a.text)}>
          {project.tagline}
        </p>
      </Reveal>

      {/* Hero banner */}
      <Reveal delay={0.1}>
        <div
          className={cn(
            "mt-8 flex h-56 items-end overflow-hidden rounded-3xl bg-gradient-to-br p-8 sm:h-72",
            a.gradient,
          )}
        >
          <span className="font-mono text-sm uppercase tracking-widest text-fg/80">
            {project.year} · {project.role}
          </span>
        </div>
      </Reveal>

      {/* Meta + links */}
      <Reveal delay={0.12}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="gradient-border inline-flex items-center gap-2 rounded-full bg-[rgb(var(--neon-violet)/0.16)] px-5 py-2.5 text-sm font-semibold text-fg transition-shadow hover:glow-violet"
            >
              Visit live site
              <ExternalLink size={15} />
            </a>
          )}
          {project.links?.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-fg"
            >
              <Github size={15} />
              Source
            </a>
          )}
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-fg"
            >
              <Play size={15} />
              Watch demo
            </a>
          )}
        </div>
      </Reveal>

      {/* Overview */}
      <div className="mt-14 grid gap-10 md:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <Reveal>
            <h2 className="text-xl font-bold text-fg">Overview</h2>
          </Reveal>
          {project.overview.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-base leading-relaxed text-fg-muted">{para}</p>
            </Reveal>
          ))}

          <Reveal>
            <h2 className="pt-4 text-xl font-bold text-fg">Highlights</h2>
          </Reveal>
          <ul className="space-y-3">
            {project.highlights.map((h, i) => (
              <Reveal as="li" key={h} delay={i * 0.05} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                    a.chip,
                  )}
                >
                  <Check size={12} className={a.text} />
                </span>
                <span className="text-fg-muted">{h}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <Reveal delay={0.1}>
          <GlassCard className="h-fit p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              Role
            </p>
            <p className="mt-1 text-sm font-semibold text-fg">{project.role}</p>

            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-fg-muted">
              Year
            </p>
            <p className="mt-1 text-sm font-semibold text-fg">{project.year}</p>

            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-fg-muted">
              Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border px-2 py-0.5 font-mono text-[11px] text-fg-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>

      {/* Prev / next */}
      <nav className="mt-20 grid gap-4 border-t pt-10 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="glass group rounded-2xl p-5 transition-shadow hover:glow-violet"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
              <ArrowLeft size={13} /> Previous
            </span>
            <p className="mt-1 font-semibold text-fg">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="glass group rounded-2xl p-5 text-right transition-shadow hover:glow-violet"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
              Next <ArrowRight size={13} />
            </span>
            <p className="mt-1 font-semibold text-fg">{next.title}</p>
          </Link>
        ) : (
          <Link
            href="/contact"
            className="glass group rounded-2xl p-5 text-right transition-shadow hover:glow-cyan"
          >
            <span className="inline-flex items-center justify-end gap-1.5 text-xs text-fg-muted">
              Like what you see? <ArrowUpRight size={13} />
            </span>
            <p className="mt-1 font-semibold text-fg">Get in touch</p>
          </Link>
        )}
      </nav>
    </article>
  );
}
