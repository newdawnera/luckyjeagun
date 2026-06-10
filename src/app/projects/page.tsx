import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FlipCard } from "@/components/ui/FlipCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of things I've designed and built.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        description="A selection of things I've designed and built. Hover or tap a card to flip it, then open the full case study."
      />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <Reveal key={p.slug} delay={(idx % 3) * 0.08}>
              <FlipCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
