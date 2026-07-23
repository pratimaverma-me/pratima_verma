"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

import { getProfile } from "@/services/profile-service";
import { useApi } from "@/lib/useApi";
import { useActiveSection } from "@/lib/useActiveSection";
import { navLinks, sectionIds } from "@/lib/nav";
import { RotatingRole } from "@/components/ui/RotatingRole";
import { ResumeViewButton } from "@/components/ui/ResumeViewButton";
import { ResumeDownloadButton } from "@/components/ui/ResumeDownloadButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { SocialLink } from "@/types/profile";

const socialIconMap: Partial<Record<SocialLink["icon"], typeof Github>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Sidebar() {
  const state = useApi(getProfile);
  const active = useActiveSection(sectionIds);

  const socials =
    state.status === "success"
      ? state.data.socials.filter(
          (
            social,
          ): social is SocialLink & {
            icon: keyof typeof socialIconMap;
          } => social.icon in socialIconMap,
        )
      : [];

  return (
    <aside
      className="
        relative
        z-20
        w-full
        min-w-0
        border-b
        border-border
        px-5
        py-8

        sm:px-8
        sm:py-10

        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:flex
        lg:h-screen
        lg:w-[36%]
        lg:flex-col
        lg:justify-between
        lg:border-b-0
        lg:border-r
        lg:px-10
        lg:py-14
      "
    >
      <div>
        {state.status === "loading" && (
          <div
            className="space-y-4"
            role="status"
            aria-live="polite"
          >
            <div className="h-9 w-48 animate-pulse rounded-md bg-border" />
            <div className="h-5 w-56 animate-pulse rounded-md bg-border" />
            <div className="h-16 w-full max-w-sm animate-pulse rounded-md bg-border" />
          </div>
        )}

        {state.status === "error" && (
          <p className="text-sm text-error">
            Couldn&apos;t load profile: {state.error}
          </p>
        )}

        {state.status === "success" && (
          <>
            <a
              href="#about"
              className="
                inline-block
                rounded-md
                text-3xl
                font-bold
                tracking-tight
                text-foreground
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-accent/70
                sm:text-4xl
              "
            >
              {state.data.name}
            </a>

            <p className="mt-2 text-base font-medium text-accent sm:text-lg">
              <RotatingRole title={state.data.title} />
            </p>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {state.data.summary}
            </p>
          </>
        )}

        {/* Desktop navigation */}
        <nav
          aria-label="Section navigation"
          className="mt-6 hidden lg:mt-8 lg:block"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className="
                      group
                      relative
                      flex
                      items-center
                      gap-4
                      rounded-md
                      py-2.5
                      pl-1
                      pr-2
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-accent/70
                    "
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="sidebar-active-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute left-0 h-px w-8 bg-accent"
                      />
                    ) : (
                      <span className="h-px w-4 bg-muted transition-all duration-300 ease-out group-hover:w-8 group-hover:bg-foreground/60" />
                    )}

                    <span
                      className={`
                        font-mono
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        transition-colors
                        duration-200
                        ease-out
                        ${
                          isActive
                            ? "text-foreground"
                            : "text-muted group-hover:text-foreground/80"
                        }
                      `}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile navigation */}
        <nav
          aria-label="Section navigation"
          className="-mx-1 mt-5 flex gap-1 overflow-x-auto pb-1 lg:hidden"
        >
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-3.5
                  py-1.5
                  font-mono
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-wide
                  transition-colors
                  duration-200
                  ease-out
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-accent/70
                  ${
                    isActive
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-border text-muted hover:text-foreground/80"
                  }
                `}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 lg:mt-10">
        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = socialIconMap[social.icon];

            if (!Icon) {
              return null;
            }

            return (
              <a
                key={social.label}
                href={social.href}
                target={
                  social.href.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={social.label}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-border
                  text-foreground/70
                  transition-all
                  duration-200
                  ease-out
                  hover:-translate-y-0.5
                  hover:border-accent-hover
                  hover:text-accent-hover
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-accent/70
                "
              >
                <Icon size={15} />
              </a>
            );
          })}

          <ThemeToggle />
        </div>

        {state.status === "success" && state.data.resumeUrl && (
          <div className="mt-5 flex flex-wrap gap-3">
            <ResumeViewButton
              href={state.data.resumeUrl}
              className="px-4 py-2 text-xs"
            />

            <ResumeDownloadButton
              href={state.data.resumeUrl}
              className="px-4 py-2 text-xs"
            />
          </div>
        )}
      </div>
    </aside>
  );
}