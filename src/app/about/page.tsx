import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SkillCard } from "@/components/ui/SkillCard";

export const metadata: Metadata = {
  title: "About",
  description: "The story, the approach, and the stack behind the work.",
};

const skills = [
  {
    title: "Languages",
    blurb: "The core toolkit.",
    items: ["JavaScript (ES6+)", "Python", "SQL", "TypeScript"],
  },
  {
    title: "Frontend",
    blurb: "Web & mobile interfaces.",
    items: ["React", "React Native", "Tailwind CSS", "Recharts"],
  },
  {
    title: "Backend",
    blurb: "The engine room.",
    items: ["Node.js", "Express", "FastAPI", "REST APIs"],
  },
  {
    title: "Data & AI",
    blurb: "Where the intelligence lives.",
    items: ["Firebase / Firestore", "MongoDB", "Groq & Gemini AI", "AI/ML APIs"],
  },
];

const timeline = [
  {
    year: "2025",
    title: "Building AI-powered web & mobile products",
    body: "AI Meeting Wizard, a cooking assistant, and a banking risk dashboard — shipping real tools that pair full-stack engineering with applied AI.",
  },
  {
    year: "2024",
    title: "Full-stack & backend engineering",
    body: "Healthcare staffing backends, AI movie recommendations, and an AI CV-scoring platform across Node, Express, SQL, and MongoDB.",
  },
  {
    year: "Earlier",
    title: "From experiments to engineering",
    body: "Started with small personal projects, which grew into a focus on full-stack development and problem-solving.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Engineering with real-world impact."
        description="I build data-driven web and mobile applications, with a focus on accessibility, performance, and exploring how AI can make software more useful."
      />

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <Reveal>
          <GlassCard className="space-y-5 p-8 md:p-10">
            <p className="text-base leading-relaxed text-fg-muted">
              Hi, I&apos;m Daniel — a software developer and data analyst passionate about building
              efficient, user-centred digital experiences. I enjoy turning ideas
              into real products through clean design, thoughtful architecture, and
              reliable code.
            </p>
            <p className="text-base leading-relaxed text-fg-muted">
              My journey into development started with experimenting on small
              personal projects, and it quickly grew into a broader interest in
              full-stack engineering and problem-solving. Today, I focus on creating
              modern web and mobile applications and exploring how AI can enhance
              productivity, automation, and user experiences.
            </p>
            <p className="text-base leading-relaxed text-fg-muted">
              I&apos;m always learning, experimenting, and building — whether it&apos;s a
              full-stack app, an AI-powered tool, or a feature that helps make
              technology more accessible and intuitive.
            </p>
          </GlassCard>
        </Reveal>
      </section>

      {/* Skills — flip cards */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-fg">
            What I work with
          </h2>
          <p className="mt-2 text-sm text-fg-muted">Tap a card to flip it.</p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <SkillCard {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-fg">Journey</h2>
        </Reveal>
        <div className="mt-8 space-y-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <GlassCard className="flex flex-col gap-2 p-6 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="font-mono text-sm text-[rgb(var(--neon-violet))]">
                  {t.year}
                </span>
                <div>
                  <h3 className="font-semibold text-fg">{t.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{t.body}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
