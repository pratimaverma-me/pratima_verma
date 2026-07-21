"use client";

import { motion } from "framer-motion";
import { getEducation } from "@/services/education-service";
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

export function Education() {
  const state = useApi(getEducation);

  return (
    <AnimatedSection id="education">
      <SectionHeading eyebrow="Background" title="Education" />

      {state.status === "loading" && <LoadingSkeleton rows={1} />}
      {state.status === "error" && <ErrorState message={state.error} />}

      {state.status === "success" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative space-y-10 border-l-2 border-border pl-8 sm:pl-10"
        >
          {state.data.map((edu) => (
            <motion.div key={edu.id} variants={item} className="group relative">
              <span
                aria-hidden="true"
                className="absolute -left-[38px] top-6 h-3 w-3 rounded-full border-2 border-accent bg-background transition-transform duration-200 ease-out group-hover:scale-125 sm:-left-[46px]"
              />

              <Card>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                  <span className="font-mono text-xs text-muted">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">{edu.institution}</p>
                {edu.coursework.length > 0 && (
                  <>
                    <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                      Relevant Coursework
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <Badge key={course}>{course}</Badge>
                      ))}
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatedSection>
  );
}
