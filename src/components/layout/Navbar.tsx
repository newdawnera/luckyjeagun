"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Download } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500",
          scrolled ? "glass-strong shadow-lg" : "glass",
        )}
      >
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <span className="gradient-border grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[rgb(var(--neon-violet)/0.15)] font-mono text-sm font-bold text-fg">
            {site.initials}
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-fg">
            {site.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  isActive(item.href)
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-[rgb(var(--neon-violet)/0.16)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.cvPath}
            target="_blank"
            rel="noreferrer"
            className="gradient-border hidden items-center gap-1.5 rounded-full bg-[rgb(var(--neon-violet)/0.16)] px-3.5 py-1.5 text-sm font-semibold text-fg transition-shadow hover:glow-violet md:inline-flex"
          >
            <Download size={14} /> CV
          </a>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="glass grid h-10 w-10 place-items-center rounded-full text-fg md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong absolute top-20 left-4 right-4 rounded-2xl p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 transition-colors hover:bg-[rgb(var(--fg)/0.05)]",
                      isActive(item.href) ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.cvPath}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 font-semibold text-fg transition-colors hover:bg-[rgb(var(--fg)/0.05)]"
                >
                  <Download size={16} /> Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
