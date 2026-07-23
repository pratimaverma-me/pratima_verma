"use client";

import { motion } from "framer-motion";
import { getExperience } from "@/services/experience-service";
import { useApi } from "@/lib/useApi";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Experience() {
  const state = useApi(getExperience);

  return (
    <AnimatedSection id="experience">
      <SectionHeading eyebrow="Career" title="Experience" />

      {state.status === "loading" && <LoadingSkeleton rows={2} />}
      {state.status === "error" && <ErrorState message={state.error} />}

      {state.status === "success" && (
        <div className="relative w-full min-w-0">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 hidden w-px bg-border xl:block"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full min-w-0 space-y-6"
          >
            {state.data.map((exp) => (
              <motion.article
                key={exp.id}
                variants={item}
                className="group relative w-full min-w-0 xl:pl-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[10px] top-6 hidden h-3 w-3 rounded-full border-2 border-accent bg-background transition-transform duration-200 ease-out group-hover:scale-125 xl:block"
                />

                <Card className="w-full min-w-0 hover:shadow-[0_0_32px_-8px_rgb(var(--primary)/0.35)]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {exp.organization} · {exp.location}
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-foreground/80">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                  {exp.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      )}
    </AnimatedSection>
  );
}
