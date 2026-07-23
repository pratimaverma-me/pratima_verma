"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ChevronDown,
  ExternalLink,
  Github,
  Globe,
  Package,
  Waves,
} from "lucide-react";

import { getProjects } from "@/services/projects-service";
import { useApi } from "@/lib/useApi";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectItem } from "@/types/project";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const COLLAPSED_TAG_LIMIT = 5;

const ORDER_BOOK_GITHUB_URL =
  "https://github.com/pratimaverma-me/orderbook-rust-";

function linkIcon(label: string) {
  const lower = label.toLowerCase();

  if (lower.includes("github")) return Github;
  if (lower.includes("pypi")) return Package;
  if (lower.includes("live") || lower.includes("demo")) return Globe;

  return ExternalLink;
}

function projectVisual(project: ProjectItem) {
  const stack = project.techStack.join(" ").toLowerCase();
  const name = project.name.toLowerCase();

  if (
    stack.includes("yolo") ||
    name.includes("flood") ||
    name.includes("detection")
  ) {
    return {
      Icon: Waves,
      label: "Computer Vision",
    };
  }

  if (
    stack.includes("order book") ||
    stack.includes("low-latency") ||
    stack.includes("market microstructure")
  ) {
    return {
      Icon: Activity,
      label: "Low-Latency Systems",
    };
  }

  return {
    Icon: Package,
    label: "Rust Library",
  };
}

function getProjectLinks(project: ProjectItem): ProjectItem["links"] {
  const name = project.name.toLowerCase();
  const stack = project.techStack.join(" ").toLowerCase();

  const isOrderBookProject =
    name.includes("order book") || stack.includes("order book");

  const githubLinkAlreadyExists = project.links.some(
    (link) =>
      link.href === ORDER_BOOK_GITHUB_URL ||
      link.label.toLowerCase().includes("github"),
  );

  if (!isOrderBookProject || githubLinkAlreadyExists) {
    return project.links;
  }

  return [
    ...project.links,
    {
      label: "GitHub",
      href: ORDER_BOOK_GITHUB_URL,
    },
  ];
}

function ProjectLinks({
  links,
}: {
  links: ProjectItem["links"];
}) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => {
        const Icon = linkIcon(link.label);

        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 py-1.5 text-sm font-medium text-accent transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:bg-background/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60"
          >
            <Icon size={14} aria-hidden="true" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

function ProjectCard({
  project,
  isExpanded,
  onToggle,
}: {
  project: ProjectItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { Icon, label } = projectVisual(project);

  const contentId = `project-details-${project.id}`;

  const hasPerformanceSection =
    project.metrics.length > 0 ||
    project.benchmarkBreakdown.length > 0;

  const visibleTags = project.techStack.slice(
    0,
    COLLAPSED_TAG_LIMIT,
  );

  const projectLinks = getProjectLinks(project);

  return (
    <Card
      className={`group flex h-full flex-col overflow-hidden ${
        project.featured ? "border-accent/30" : ""
      }`}
    >
      <div className="relative -mx-6 -mt-6 mb-4 h-28 overflow-hidden sm:-mx-8 sm:-mt-8 sm:mb-5">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-2.5 bg-gradient-to-br from-accent/20 via-secondary/10 to-background transition-transform duration-300 ease-out group-hover:scale-105">
            <Icon
              size={20}
              className="text-accent/70"
              aria-hidden="true"
            />

            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/40">
              {label}
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
        <h3 className="text-lg font-semibold text-foreground">
          {project.name}
        </h3>

        <span className="shrink-0 font-mono text-xs text-muted">
          {project.period}
        </span>
      </div>

      {!isExpanded && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/80">
          {project.description}
        </p>
      )}

      {project.metrics.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="min-w-0 rounded-lg border border-border bg-background/40 p-3 sm:p-4"
            >
              <p className="break-words font-mono text-[10px] uppercase tracking-wide text-muted">
                {metric.label}
              </p>

              <p className="mt-1 break-words text-xl font-bold text-accent sm:text-2xl">
                {metric.value}
              </p>

              <p className="mt-0.5 break-words text-[11px] leading-snug text-muted">
                {metric.caption}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4">
        {!isExpanded && visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={onToggle}
          className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-accent transition-all duration-200 ease-out hover:border-accent-hover/40 hover:bg-background/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60 ${
            !isExpanded && visibleTags.length > 0
              ? "mt-4"
              : ""
          }`}
        >
          {isExpanded ? "Show Less" : "View More"}

          <ChevronDown
            size={14}
            className={`shrink-0 transition-transform duration-200 ease-out ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={contentId}
              key="details"
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <div className="space-y-5 pt-5">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    Overview
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {project.description}
                  </p>
                </div>

                {project.highlights.length > 0 && (
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                      Key Contributions
                    </p>

                    <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-foreground/80">
                      {project.highlights.map(
                        (highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                {hasPerformanceSection && (
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                      Performance Results
                    </p>

                    {project.metricsNote && (
                      <p className="mt-2 break-words text-xs leading-relaxed text-muted">
                        {project.metricsNote}
                      </p>
                    )}

                    {project.benchmarkBreakdown.length > 0 && (
                      <dl className="mt-3 space-y-1.5 rounded-lg border border-border bg-background/30 p-3">
                        {project.benchmarkBreakdown.map(
                          (stage) => (
                            <div
                              key={stage.label}
                              className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5"
                            >
                              <dt className="break-words text-xs text-foreground/80">
                                {stage.label}
                              </dt>

                              <dd className="whitespace-nowrap font-mono text-xs font-medium text-accent">
                                {stage.value}
                              </dd>
                            </div>
                          ),
                        )}
                      </dl>
                    )}
                  </div>
                )}

                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    Technologies
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>

                {projectLinks.length > 0 && (
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                      Links
                    </p>

                    <div className="mt-2">
                      <ProjectLinks links={projectLinks} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

export function Projects() {
  const state = useApi(getProjects);

  const [expandedProjectId, setExpandedProjectId] = useState<
    string | null
  >(null);

  return (
    <AnimatedSection id="projects">
      <SectionHeading eyebrow="Work" title="Projects" />

      {state.status === "loading" && (
        <LoadingSkeleton rows={2} />
      )}

      {state.status === "error" && (
        <ErrorState message={state.error} />
      )}

      {state.status === "success" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="grid grid-cols-1 gap-6 xl:grid-cols-2"
        >
          {state.data.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="min-w-0"
            >
              <ProjectCard
                project={project}
                isExpanded={
                  expandedProjectId === project.id
                }
                onToggle={() =>
                  setExpandedProjectId((current) =>
                    current === project.id
                      ? null
                      : project.id,
                  )
                }
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatedSection>
  );
}