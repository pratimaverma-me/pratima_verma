"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Bug,
  Cpu,
  Gauge,
  Layers,
  LineChart,
  ListChecks,
  Terminal,
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
    description: "Memory-safe and concurrent systems development.",
  },
  "Operating Systems": {
    icon: Terminal,
    description: "Linux internals, process management, and shell-level tooling.",
  },
  "Financial Systems": {
    icon: LineChart,
    description: "Low-latency market-data and trading infrastructure.",
  },
  "Performance Engineering": {
    icon: Gauge,
    description: "Profiling and optimization of latency-sensitive systems.",
  },
  "Testing & Debugging": {
    icon: Bug,
    description: "Verifying correctness and diagnosing failures under load.",
  },
  "Tools & Frameworks": {
    icon: Wrench,
    description: "Supporting libraries, ML frameworks, and developer tooling.",
  },
};

const DEFAULT_META = { icon: Boxes, description: "" };

export function Skills() {
  const state = useApi(getSkills);

  return (
    <AnimatedSection id="skills">
      <SectionHeading eyebrow="Toolbox" title="Skills" />

      {state.status === "loading" && <LoadingSkeleton rows={2} />}
      {state.status === "error" && <ErrorState message={state.error} />}

      {state.status === "success" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 sm:gap-6"
        >
          {state.data.map((category) => {
            const meta = CATEGORY_META[category.category] ?? DEFAULT_META;
            const Icon = meta.icon;

            return (
              <motion.div key={category.id} variants={item} className="h-full">
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
      )}
    </AnimatedSection>
  );
}
