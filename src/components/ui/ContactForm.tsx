"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-xl border border-[rgb(var(--glass-border))] bg-[rgb(var(--glass)/0.4)] px-4 py-3 text-sm text-fg placeholder:text-fg-muted/70 outline-none transition focus:border-[rgb(var(--neon-violet)/0.7)] focus:ring-2 focus:ring-[rgb(var(--neon-violet)/0.25)]";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const formspreeId = site.formspreeId as string;
  const usesFormspree = formspreeId.length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    // Fallback: no Formspree configured -> open a pre-filled mail draft.
    if (!usesFormspree) {
      setStatus("sending");
      const subject = encodeURIComponent(`Project enquiry from ${name || "your site"}`);
      const body = encodeURIComponent(
        `${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
      );
      window.setTimeout(() => {
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("idle");
      }, 600);
      return;
    }

    // In-page AJAX submission (reCAPTCHA disabled) — visitor stays on the site.
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function onEdit(setter: (v: string) => void) {
    return (v: string) => {
      if (status === "error") setStatus("idle");
      setter(v);
    };
  }

  // Success notification — shown in place of the form, no page navigation.
  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--neon-cyan)/0.15)] text-[rgb(var(--neon-cyan))]">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-bold tracking-tight text-fg">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
          Thanks for reaching out — your message landed in my inbox. I&apos;ll get back
          to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--glass-border))] px-5 py-2.5 text-sm font-medium text-fg transition hover:bg-[rgb(var(--glass)/0.4)]"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-fg-muted">
            Name
          </span>
          <input
            required
            name="name"
            value={name}
            onChange={(e) => onEdit(setName)(e.target.value)}
            placeholder="Ada Lovelace"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-fg-muted">
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => onEdit(setEmail)(e.target.value)}
            placeholder="you@company.com"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-fg-muted">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={6}
          value={message}
          onChange={(e) => onEdit(setMessage)(e.target.value)}
          placeholder="Tell me about your project, timeline, and what success looks like…"
          className={cn(fieldClass, "resize-none")}
        />
      </label>

      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition",
          "bg-gradient-to-r from-[rgb(var(--neon-violet))] to-[rgb(var(--neon-pink))]",
          "hover:glow-violet disabled:opacity-90",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "sending" ? (
            <motion.span
              key="sending"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-2"
            >
              {usesFormspree ? "Sending" : "Opening your mail app"}
              <Loader2 className="h-4 w-4 animate-spin" />
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-2"
            >
              Send message <Send className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {status === "error" && (
        <p className="flex items-center justify-center gap-2 text-center text-xs text-[rgb(var(--neon-pink))]">
          <AlertCircle className="h-3.5 w-3.5" />
          Something went wrong. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
