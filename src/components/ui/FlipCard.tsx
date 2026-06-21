"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, RotateCw, Play, FileText } from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import type { Project } from "@/lib/projects";
import { accentMap } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function FlipCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);
  const a = accentMap[project.accent];

  return (
    <div className="group flip-perspective h-[22rem] w-full">
      <div className={cn("flip-inner", flipped && "is-flipped")}>
        {/* ---------- FRONT ---------- */}
        <div className="flip-face glass-strong gradient-border flex flex-col justify-between p-6">
          {/* Gradient visual */}
          <div
            className={cn(
              "absolute inset-0 -z-10 bg-gradient-to-br opacity-70",
              a.gradient,
            )}
          />
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-fg/70">
              {project.hackathon ?? project.year}
            </span>
            <button
              type="button"
              aria-label="Flip card for details"
              onClick={() => setFlipped(true)}
              className="glass grid h-9 w-9 place-items-center rounded-full text-fg md:hidden"
            >
              <RotateCw size={15} />
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-fg">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-fg/80">{project.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium text-fg",
                    a.chip,
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-4 hidden text-xs text-fg/60 md:block">
              Hover to flip →
            </p>
          </div>
        </div>

        {/* ---------- BACK ---------- */}
        <div className="flip-face flip-back glass-strong flex flex-col justify-between p-6">
          <div>
            <div className="flex items-start justify-between">
              <h3 className={cn("text-lg font-bold", a.text)}>{project.title}</h3>
              <button
                type="button"
                aria-label="Flip card back"
                onClick={() => setFlipped(false)}
                className="glass grid h-9 w-9 place-items-center rounded-full text-fg md:hidden"
              >
                <RotateCw size={15} />
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {project.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border px-2 py-0.5 font-mono text-[11px] text-fg-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <Link
              href={`/projects/${project.slug}`}
              className="gradient-border flex w-full items-center justify-center gap-1.5 rounded-full bg-[rgb(var(--neon-violet)/0.16)] px-4 py-2.5 text-sm font-semibold text-fg transition-shadow hover:glow-violet"
            >
              Case study
              <ArrowUpRight size={15} />
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live site"
                  className="glass grid h-10 w-10 place-items-center rounded-full text-fg"
                >
                  <ExternalLink size={15} />
                </a>
              )}
              {project.links?.source && (
                <a
                  href={project.links.source}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Source code"
                  className="glass grid h-10 w-10 place-items-center rounded-full text-fg"
                >
                  <Github size={15} />
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Watch demo"
                  className="glass grid h-10 w-10 place-items-center rounded-full text-fg"
                >
                  <Play size={15} />
                </a>
              )}
              {project.links?.article && (
                <a
                  href={project.links.article}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Read the write-up"
                  className="glass grid h-10 w-10 place-items-center rounded-full text-fg"
                >
                  <FileText size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
