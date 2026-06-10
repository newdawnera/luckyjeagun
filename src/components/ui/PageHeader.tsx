import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-36 pb-10">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[rgb(var(--neon-violet))]">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg sm:text-5xl md:text-6xl">
          {title}
        </h1>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </header>
  );
}
