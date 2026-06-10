"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function SkillCard({
  title,
  blurb,
  items,
}: {
  title: string;
  blurb: string;
  items: string[];
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      className="group flip-perspective h-44 w-full text-left focus:outline-none"
    >
      <div className={cn("flip-inner", flipped && "is-flipped")}>
        {/* front */}
        <div className="flip-face glass flex flex-col justify-between p-5">
          <h3 className="text-lg font-bold text-fg">{title}</h3>
          <p className="text-sm text-fg-muted">{blurb}</p>
          <span className="font-mono text-[11px] uppercase tracking-widest text-fg-muted">
            Flip →
          </span>
        </div>
        {/* back */}
        <div className="flip-face flip-back glass-strong flex flex-col justify-center gap-2 p-5">
          {items.map((it) => (
            <span key={it} className="text-sm text-fg">
              · {it}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
