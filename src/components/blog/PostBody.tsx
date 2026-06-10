import type { PostBlock } from "@/lib/posts";

/** Renders a post's structured body blocks as styled prose. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="pt-4 text-2xl font-bold tracking-tight text-fg sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-2 text-xl font-semibold text-fg">
                {block.text}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-[rgb(var(--neon-violet))] pl-5 text-lg font-medium italic text-fg"
              >
                {block.text}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-fg-muted">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--neon-violet))]"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className="text-base leading-relaxed text-fg-muted sm:text-lg">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
