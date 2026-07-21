"use client";

import { motion } from "framer-motion";
import { getProfile } from "@/services/profile-service";
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

export function About() {
  const state = useApi(getProfile);

  return (
    <AnimatedSection id="about">
      <SectionHeading eyebrow="Introduction" title="About Me" />

      {state.status === "loading" && <LoadingSkeleton rows={3} />}
      {state.status === "error" && <ErrorState message={state.error} />}

      {state.status === "success" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-10 lg:grid-cols-[2fr_1fr]"
        >
          <div className="space-y-8">
            <motion.div variants={item}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                My Journey
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-foreground/90 sm:text-xl">
                {state.data.journey}
              </p>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                What I Enjoy Building
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-body">
                {state.data.enjoysBuilding}
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-2">
              {state.data.focusAreas.map((area) => (
                <Badge key={area}>{area}</Badge>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item}>
            <Card>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted">Role</dt>
                  <dd className="mt-1 font-medium text-foreground">{state.data.title}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted">Location</dt>
                  <dd className="mt-1 font-medium text-foreground">{state.data.location}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted">Email</dt>
                  <dd className="mt-1 font-medium text-foreground">{state.data.email}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted">Phone</dt>
                  <dd className="mt-1 font-medium text-foreground">{state.data.phone}</dd>
                </div>
              </dl>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatedSection>
  );
}
