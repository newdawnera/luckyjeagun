import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FlipCard } from "@/components/ui/FlipCard";
import { mainProjects, hackathonProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of things I've designed and built.",
};

/** Cards per page in the main grid (3 full rows on desktop). */
const PAGE_SIZE = 9;

function pageHref(page: number) {
  return page <= 1 ? "/projects" : `/projects?page=${page}`;
}

function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;
  return (
    <nav
      aria-label="Projects pages"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {current > 1 ? (
        <Link
          href={pageHref(current - 1)}
          aria-label="Previous page"
          className="glass grid h-10 w-10 place-items-center rounded-full text-fg transition-colors hover:glow-violet"
        >
          <ChevronLeft size={16} />
        </Link>
      ) : (
        <span className="glass grid h-10 w-10 place-items-center rounded-full text-fg-muted opacity-40">
          <ChevronLeft size={16} />
        </span>
      )}

      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={pageHref(n)}
          aria-current={n === current ? "page" : undefined}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full text-sm font-semibold transition-colors",
            n === current
              ? "gradient-border bg-[rgb(var(--neon-violet)/0.16)] text-fg"
              : "glass text-fg-muted hover:text-fg",
          )}
        >
          {n}
        </Link>
      ))}

      {current < total ? (
        <Link
          href={pageHref(current + 1)}
          aria-label="Next page"
          className="glass grid h-10 w-10 place-items-center rounded-full text-fg transition-colors hover:glow-violet"
        >
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="glass grid h-10 w-10 place-items-center rounded-full text-fg-muted opacity-40">
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(mainProjects.length / PAGE_SIZE));
  const current = Math.min(
    Math.max(Number.parseInt(page ?? "1", 10) || 1, 1),
    totalPages,
  );
  const visible = mainProjects.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE,
  );

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        description="A selection of things I've designed and built. Hover or tap a card to flip it, then open the full case study."
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, idx) => (
            <Reveal key={p.slug} delay={(idx % 3) * 0.08}>
              <FlipCard project={p} />
            </Reveal>
          ))}
        </div>

        <Pagination current={current} total={totalPages} />
      </section>

      {hackathonProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[rgb(var(--neon-cyan))]">
              Built against the clock
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              Hackathons
            </h2>
            <p className="mt-3 max-w-2xl text-fg-muted">
              Time-boxed builds for game jams and hackathons — designed,
              built, and shipped on a deadline.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hackathonProjects.map((p, idx) => (
              <Reveal key={p.slug} delay={(idx % 3) * 0.08}>
                <FlipCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
