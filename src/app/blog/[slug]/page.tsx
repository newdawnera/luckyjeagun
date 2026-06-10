import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { posts, getPost, formatDate } from "@/lib/posts";
import { accentMap } from "@/lib/accents";
import { Reveal } from "@/components/ui/Reveal";
import { PostBody } from "@/components/blog/PostBody";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [site.name],
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const a = accentMap[post.accent];
  const idx = posts.findIndex((p) => p.slug === slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <article className="mx-auto max-w-3xl px-6 pt-36 pb-24">
      <Reveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} /> All posts
        </Link>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
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
      </Reveal>

      <Reveal delay={0.12}>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl">
          {post.title}
        </h1>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-fg-muted">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> {post.readMins} min read
          </span>
          <span aria-hidden>·</span>
          <span>{site.name}</span>
        </div>
      </Reveal>

      <div
        className={cn(
          "mt-8 h-px w-full bg-gradient-to-r to-transparent",
          a.gradient,
        )}
      />

      <Reveal delay={0.24}>
        <div className="mt-10">
          <PostBody blocks={post.body} />
        </div>
      </Reveal>

      <div className="mt-16 border-t border-[rgb(var(--glass-border)/var(--glass-border-alpha))] pt-8">
        <Link
          href={`/blog/${next.slug}`}
          className="group flex items-center justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              Next post
            </p>
            <p className="mt-1 text-lg font-semibold text-fg transition-colors group-hover:text-[rgb(var(--neon-violet))]">
              {next.title}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-fg-muted transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
