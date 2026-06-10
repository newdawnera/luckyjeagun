import type { Metadata } from "next";
import { Mail, MapPin, CircleDot, ArrowUpRight, Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — open to work, collaborations, and interesting problems.`,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Say hello"
        title="Let's build something"
        description="Have a project, a role, or a half-formed idea worth chasing? Tell me about it — I read every message."
      />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <GlassCard className="p-7 sm:p-9">
              <ContactForm />
            </GlassCard>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.08}>
              <GlassCard glow="violet" className="p-7">
                <h2 className="text-lg font-semibold text-fg">How to reach me</h2>
                <div className="mt-4 flex items-center gap-3 text-sm text-fg-muted">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--neon-violet)/0.15)] text-[rgb(var(--neon-violet))]">
                    <Mail className="h-4 w-4" />
                  </span>
                  The form is the fastest way to me — I read every message.
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-fg-muted">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--neon-cyan)/0.15)] text-[rgb(var(--neon-cyan))]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {site.location}
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-fg-muted">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--neon-pink)/0.15)] text-[rgb(var(--neon-pink))]">
                    <CircleDot className="h-4 w-4" />
                  </span>
                  {site.status}
                </div>
                <a
                  href={site.cvPath}
                  target="_blank"
                  rel="noreferrer"
                  className="gradient-border mt-5 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--neon-violet)/0.16)] px-5 py-2.5 text-sm font-semibold text-fg transition-shadow hover:glow-violet"
                >
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.16}>
              <GlassCard className="p-7">
                <h2 className="text-lg font-semibold text-fg">Elsewhere</h2>
                <ul className="mt-4 space-y-1">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-fg-muted transition hover:bg-[rgb(var(--glass)/0.4)] hover:text-fg"
                      >
                        {s.label}
                        <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
