"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Globe, Package } from "lucide-react";
import { getProjects } from "@/services/projects-service";
import { useApi } from "@/lib/useApi";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function linkIcon(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("github")) return Github;
  if (lower.includes("pypi")) return Package;
  if (lower.includes("live") || lower.includes("demo")) return Globe;
  return ExternalLink;
}

export function Projects() {
  const state = useApi(getProjects);

  return (
    <AnimatedSection id="projects">
      <SectionHeading eyebrow="Work" title="Projects" />

      {state.status === "loading" && <LoadingSkeleton rows={2} />}
      {state.status === "error" && <ErrorState message={state.error} />}

      {state.status === "success" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {state.data.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card
                className={`group flex h-full flex-col overflow-hidden ${
                  project.featured ? "border-accent/30" : ""
                }`}
              >
                <div className="relative -mx-6 -mt-6 mb-5 h-40 overflow-hidden sm:-mx-8 sm:-mt-8 sm:mb-6">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/25 via-secondary/15 to-background transition-transform duration-300 ease-out group-hover:scale-105">
                      <span className="font-mono text-5xl font-bold text-foreground/15">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {project.featured && (
                    <span className="absolute left-3 top-3 rounded-md border border-accent/40 bg-background/80 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-accent backdrop-blur">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                  <span className="font-mono text-xs text-muted">{project.period}</span>
                </div>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                {project.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.links.map((link) => {
                      const Icon = linkIcon(link.label);
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 py-1.5 text-sm font-medium text-accent transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:bg-background/70"
                        >
                          <Icon size={14} />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatedSection>
  );
}
