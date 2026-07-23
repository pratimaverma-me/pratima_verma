"use client";

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
  type LucideIcon,
} from "lucide-react";

import { getSkills } from "@/services/skills-service";
import { useApi } from "@/lib/useApi";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Card } from "@/components/ui/Card";

const CATEGORY_META: Record<
  string,
  {
    icon: LucideIcon;
    description: string;
  }
> = {
  "Programming Languages": {
    icon: ListChecks,
    description:
      "Core languages used across systems, research, and backend development.",
  },

  "Software Engineering": {
    icon: Layers,
    description:
      "Foundations for building reliable, maintainable software systems.",
  },

  "Rust & Systems Programming": {
    icon: Cpu,
    description:
      "Memory-safe, concurrent systems development and Linux internals.",
  },

  "Financial Systems": {
    icon: LineChart,
    description:
      "Low-latency market-data and trading infrastructure.",
  },

  "Performance & Testing Engineering": {
    icon: Gauge,
    description:
      "Profiling, optimizing, and verifying latency-sensitive systems.",
  },

  "Tools & Frameworks": {
    icon: Wrench,
    description:
      "Supporting libraries, ML frameworks, and developer tooling.",
  },

  "Backend Engineering": {
    icon: Server,
    description:
      "Building and integrating backend services and APIs.",
  },

  "Market Data Infrastructure": {
    icon: Network,
    description:
      "Ingesting and normalizing exchange feed data at scale.",
  },

  "Quantitative Engineering": {
    icon: Calculator,
    description:
      "Applying statistical and numerical methods to market data.",
  },
};

const DEFAULT_META = {
  icon: Boxes,
  description: "",
};

const INITIAL_VISIBLE_SKILLS = 3;

type SkillCategory = {
  id?: string | number;
  category: string;
  skills: string[];
};

function SkillCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const meta = CATEGORY_META[category.category] ?? DEFAULT_META;
  const Icon = meta.icon;

  return (
    <div
      key={`${category.category}-${index}`}
      className="h-full min-w-0"
    >
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
          <p className="mt-2.5 text-xs leading-relaxed text-muted">
            {meta.description}
          </p>
        )}

        <p className="mt-4 break-words text-[13px] leading-relaxed">
          {category.skills.map((skill, skillIndex) => (
            <span
              key={`${category.category}-${skill}-${skillIndex}`}
              className={
                skillIndex < 2
                  ? "font-medium text-foreground/90"
                  : "text-foreground/55"
              }
            >
              {skill}
              {skillIndex < category.skills.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </Card>
    </div>
  );
}

export function Skills() {
  const state = useApi(getSkills);

  const skills: SkillCategory[] =
    state.status === "success" ? state.data : [];

  const initialSkills = skills.slice(0, INITIAL_VISIBLE_SKILLS);
  const additionalSkills = skills.slice(INITIAL_VISIBLE_SKILLS);
  const hiddenCount = additionalSkills.length;

  return (
    <AnimatedSection id="skills">
      <SectionHeading eyebrow="Toolbox" title="Skills" />

      {state.status === "loading" && (
        <LoadingSkeleton rows={2} />
      )}

      {state.status === "error" && (
        <ErrorState message={state.error} />
      )}

      {state.status === "success" && (
        <>
          {/* Always show only the first 3 cards */}
          <div
            id="skills-grid"
            className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3"
          >
            {initialSkills.map((category, index) => (
              <SkillCard
                key={`${category.category}-${index}`}
                category={category}
                index={index}
              />
            ))}
          </div>

          {/* Reveal the remaining cards */}
          {hiddenCount > 0 && (
            <details className="group mt-8">
              <summary
                className="
                  mx-auto
                  flex
                  w-fit
                  cursor-pointer
                  list-none
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-border
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-foreground/80
                  transition-colors
                  duration-200
                  hover:border-accent-hover/40
                  hover:text-accent-hover
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-accent/70
                  [&::-webkit-details-marker]:hidden
                "
              >
                <span className="group-open:hidden">
                  Show {hiddenCount} More Skills
                </span>

                <span className="hidden group-open:inline">
                  Show Less
                </span>

                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {additionalSkills.map((category, index) => (
                  <SkillCard
                    key={`${category.category}-${INITIAL_VISIBLE_SKILLS + index}`}
                    category={category}
                    index={INITIAL_VISIBLE_SKILLS + index}
                  />
                ))}
              </div>
            </details>
          )}
        </>
      )}
    </AnimatedSection>
  );
}