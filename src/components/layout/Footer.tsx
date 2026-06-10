import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-12">
      <div className="glass rounded-3xl p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="gradient-border grid h-9 w-9 place-items-center rounded-xl bg-[rgb(var(--neon-violet)/0.15)] font-mono text-sm font-bold text-fg">
                {site.initials}
              </span>
              <span className="text-sm font-semibold text-fg">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {site.role}. {site.status}.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                Explore
              </p>
              <ul className="mt-3 space-y-2">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                Connect
              </p>
              <ul className="mt-3 space-y-2">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-xs text-fg-muted">
            © {new Date().getFullYear()} {site.name}. Built with Next.js & care.
          </p>
        </div>
      </div>
    </footer>
  );
}
