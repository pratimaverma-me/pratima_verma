"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  Calculator,
  ChevronDown,
  Cpu,
  Gauge,
  Layers,
  LineChart,
  ListChecks,
  Network,
  Server,
  Wrench,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { getSkills } from "@/services/skills-service";
import { useApi } from "@/lib/useApi";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Card } from "@/components/ui/Card";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CATEGORY_META: Record<string, { icon: LucideIcon; description: string }> = {
  "Programming Languages": {
    icon: ListChecks,
    description: "Core languages used across systems, research, and backend development.",
  },
  "Software Engineering": {
    icon: Layers,
    description: "Foundations for building reliable, maintainable software systems.",
  },
  "Rust & Systems Programming": {
    icon: Cpu,
    description: "Memory-safe, concurrent systems development and Linux internals.",
  },
  "Financial Systems": {
    icon: LineChart,
    description: "Low-latency market-data and trading infrastructure.",
  },
  "Performance & Testing Engineering": {
    icon: Gauge,
    description: "Profiling, optimizing, and verifying latency-sensitive systems.",
  },
  "Tools & Frameworks": {
    icon: Wrench,
    description: "Supporting libraries, ML frameworks, and developer tooling.",
  },
  "Backend Engineering": {
    icon: Server,
    description: "Building and integrating backend services and APIs.",
  },
  "Market Data Infrastructure": {
    icon: Network,
    description: "Ingesting and normalizing exchange feed data at scale.",
  },
  "Quantitative Engineering": {
    icon: Calculator,
    description: "Applying statistical and numerical methods to market data.",
  },
};

const DEFAULT_META = { icon: Boxes, description: "" };

const INITIAL_VISIBLE_SKILLS = 6;

export function Skills() {
  const state = useApi(getSkills);
  const [showAll, setShowAll] = useState(false);

  const skills = state.status === "success" ? state.data : [];
  const visibleSkills = showAll ? skills : skills.slice(0, INITIAL_VISIBLE_SKILLS);
  const hiddenCount = skills.length - INITIAL_VISIBLE_SKILLS;

  return (
    <AnimatedSection id="skills">
      <SectionHeading eyebrow="Toolbox" title="Skills" />

      {state.status === "loading" && <LoadingSkeleton rows={2} />}
      {state.status === "error" && <ErrorState message={state.error} />}

      {state.status === "success" && (
        <>
          <motion.div
            id="skills-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3"
          >
            {visibleSkills.map((category) => {
              const meta = CATEGORY_META[category.category] ?? DEFAULT_META;
              const Icon = meta.icon;

              return (
                <motion.div key={category.id} variants={item} className="h-full min-w-0">
                  <Card className="flex h-full min-h-[176px] flex-col">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <h3 className="text-sm font-semibold tracking-wide text-foreground">
                        {category.category}
                      </h3>
                    </div>

                    {meta.description && (
                      <p className="mt-2.5 text-xs leading-relaxed text-muted">{meta.description}</p>
                    )}

                    <p className="mt-4 break-words text-[13px] leading-relaxed">
                      {category.skills.map((skill, i) => (
                        <span
                          key={skill}
                          className={
                            i < 2 ? "font-medium text-foreground/90" : "text-foreground/55"
                          }
                        >
                          {skill}
                          {i < category.skills.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {hiddenCount > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                aria-expanded={showAll}
                aria-controls="skills-grid"
                onClick={() => setShowAll((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/70"
              >
                {showAll ? "Show Less" : `Show ${hiddenCount} More Skills`}
                <ChevronDown
                  size={14}
                  className={`shrink-0 transition-transform duration-200 ease-out ${showAll ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </>
      )}
    </AnimatedSection>
  );
}
