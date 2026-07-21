"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { getProfile } from "@/services/profile-service";
import { useApi } from "@/lib/useApi";
import { ResumeDownloadButton } from "@/components/ui/ResumeDownloadButton";
import { ResumeViewButton } from "@/components/ui/ResumeViewButton";
import { ErrorState } from "@/components/ui/ErrorState";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Backend returns `title` as a single "/"-delimited string (e.g.
 * "Quant Developer / Rust Backend Engineer"). This cycles through each
 * segment rather than requiring a schema change for multiple roles.
 */
function RotatingRole({ title }: { title: string }) {
  const roles = useMemo(
    () => title.split("/").map((r) => r.trim()).filter(Boolean),
    [title]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const state = useApi(getProfile);

  const github = state.status === "success" ? state.data.socials.find((s) => s.icon === "github") : undefined;
  const linkedin = state.status === "success" ? state.data.socials.find((s) => s.icon === "linkedin") : undefined;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-border pt-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-[0.15]" />
        <motion.div
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-secondary/20 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="section-container w-full py-24 sm:py-32"
      >
        <motion.p variants={item} className="font-mono text-sm text-accent">
          Hi, I&apos;m
        </motion.p>

        {state.status === "loading" && (
          <div className="mt-3 space-y-4" role="status" aria-live="polite">
            <div className="h-14 w-72 animate-pulse rounded-md bg-border sm:h-20 sm:w-[28rem]" />
            <div className="h-8 w-56 animate-pulse rounded-md bg-border sm:w-72" />
            <div className="h-5 w-64 animate-pulse rounded-md bg-border" />
            <div className="flex gap-3 pt-2">
              <div className="h-11 w-28 animate-pulse rounded-lg bg-border" />
              <div className="h-11 w-28 animate-pulse rounded-lg bg-border" />
              <div className="h-11 w-28 animate-pulse rounded-lg bg-border" />
            </div>
          </div>
        )}

        {state.status === "error" && (
          <div className="mt-3 max-w-xl">
            <ErrorState message={state.error} />
          </div>
        )}

        {state.status === "success" && (
          <>
            <motion.h1
              variants={item}
              className="mt-3 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:text-8xl"
            >
              {state.data.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 text-2xl font-semibold text-accent sm:text-3xl"
            >
              <RotatingRole title={state.data.title} />
            </motion.p>

            <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {state.data.summary}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:text-accent-hover hover:shadow-card-hover"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:text-accent-hover hover:shadow-card-hover"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              )}
              {state.data.resumeUrl && (
                <>
                  <ResumeViewButton href={state.data.resumeUrl} />
                  <ResumeDownloadButton href={state.data.resumeUrl} />
                </>
              )}
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted sm:block"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
