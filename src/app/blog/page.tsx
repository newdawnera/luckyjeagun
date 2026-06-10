import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { posts, formatDate } from "@/lib/posts";
import { accentMap } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on design, motion, performance, and shipping web products.",
};

export default function BlogPage() {
  const [lead, ...rest] = posts;
  const leadAccent = accentMap[lead.accent];

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Writing"
        title="The Blog"
        description="Field notes on interface design, motion, performance, and the craft of shipping things that feel alive."
      />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <Link href={`/blog/${lead.slug}`} className="group block">
            <GlassCard
              glow={leadAccent.glow}
              className="relative overflow-hidden p-8 sm:p-10"
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br opacity-40 blur-3xl",
                  leadAccent.gradient,
                )}
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 font-mono uppercase tracking-wider",
                      leadAccent.chip,
                      leadAccent.text,
                    )}
                  >
                    Featured
                  </span>
                  <span className="text-fg-muted">{formatDate(lead.date)}</span>
                  <span className="inline-flex items-center gap-1 text-fg-muted">
                    <Clock className="h-3.5 w-3.5" /> {lead.readMins} min read
                  </span>
                </div>
                <h2 className="mt-5 max-w-3xl text-2xl font-bold tracking-tight text-fg sm:text-4xl">
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-fg-muted">
                  {lead.excerpt}
                </p>
                <span
                  className={cn(
                    "mt-6 inline-flex items-center gap-1.5 text-sm font-medium",
                    leadAccent.text,
                  )}
                >
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </GlassCard>
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {rest.map((post, i) => {
            const a = accentMap[post.accent];
            return (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <GlassCard glow={a.glow} className="flex h-full flex-col p-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                      <span>{formatDate(post.date)}</span>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {post.readMins} min
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className={cn(
                            "rounded-full px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider",
                            a.chip,
                            a.text,
                          )}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span
                      className={cn(
                        "mt-5 inline-flex items-center gap-1.5 text-sm font-medium",
                        a.text,
                      )}
                    >
                      Read more
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </GlassCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
