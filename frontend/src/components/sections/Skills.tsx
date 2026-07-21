"use client";

import { motion } from "framer-motion";
import { getSkills } from "@/services/skills-service";
import { useApi } from "@/lib/useApi";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const badgeGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

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
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {state.data.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Card>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  {category.category}
                </h3>
                <motion.div variants={badgeGroup} className="mt-3 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatedSection>
  );
}
