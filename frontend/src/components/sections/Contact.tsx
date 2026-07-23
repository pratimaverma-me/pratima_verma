"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { getProfile } from "@/services/profile-service";
import { useApi } from "@/lib/useApi";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Card } from "@/components/ui/Card";
import { ProfileData } from "@/types/profile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ConnectCard({ data }: { data: ProfileData }) {
  const github = data.socials.find((s) => s.icon === "github");
  const linkedin = data.socials.find((s) => s.icon === "linkedin");

  return (
    <motion.div variants={item}>
      <Card className="glass flex h-full flex-col justify-center">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Let&apos;s Connect
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/80">
          {data.availability}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-card-hover"
          >
            <Mail size={16} />
            Email Me
          </a>
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground/80 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:text-accent-hover hover:shadow-card-hover"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground/80 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:text-accent-hover hover:shadow-card-hover"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

function ContactMethods({ data }: { data: ProfileData }) {
  const github = data.socials.find((s) => s.icon === "github");
  const linkedin = data.socials.find((s) => s.icon === "linkedin");

  const methods = [
    { label: "Email", value: data.email, href: `mailto:${data.email}`, icon: Mail, external: false },
    ...(github
      ? [{ label: "GitHub", value: github.href.replace("https://", ""), href: github.href, icon: Github, external: true }]
      : []),
    ...(linkedin
      ? [{ label: "LinkedIn", value: linkedin.href.replace("https://", ""), href: linkedin.href, icon: Linkedin, external: true }]
      : []),
    { label: "Location", value: data.location, href: null, icon: MapPin, external: false },
  ];

  return (
    <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {methods.map((method) => {
        const Icon = method.icon;
        const content = (
          <>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60 text-accent transition-colors duration-200 group-hover:border-accent-hover/40">
              <Icon size={18} />
            </span>
            <div className="mt-4 min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{method.label}</p>
              <p className="mt-1 break-words text-sm font-medium text-foreground">{method.value}</p>
            </div>
          </>
        );

        const cardClass =
          "group flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-card transition-all duration-200 ease-out";

        if (!method.href) {
          return (
            <div key={method.label} className={cardClass}>
              {content}
            </div>
          );
        }

        return (
          <a
            key={method.label}
            href={method.href}
            target={method.external ? "_blank" : undefined}
            rel={method.external ? "noopener noreferrer" : undefined}
            className={`${cardClass} hover:-translate-y-0.5 hover:border-accent-hover/40 hover:shadow-card-hover`}
          >
            {content}
          </a>
        );
      })}
    </motion.div>
  );
}

export function Contact() {
  const state = useApi(getProfile);

  return (
    <AnimatedSection id="contact" className="relative overflow-hidden border-b-0">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <SectionHeading eyebrow="Get in touch" title="Contact" />

      {state.status === "loading" && <LoadingSkeleton rows={1} />}
      {state.status === "error" && <ErrorState message={state.error} />}

      {state.status === "success" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 mx-auto grid max-w-6xl gap-6 lg:grid-cols-2"
        >
          <ConnectCard data={state.data} />
          <ContactMethods data={state.data} />
        </motion.div>
      )}
    </AnimatedSection>
  );
}
