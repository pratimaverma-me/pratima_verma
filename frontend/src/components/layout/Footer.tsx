"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { getProfile } from "@/services/profile-service";
import { useApi } from "@/lib/useApi";
import { SocialLink } from "@/types/profile";

const iconMap: Record<SocialLink["icon"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
};

// A phone SocialLink is only rendered if its tel: href has a real number —
// guards against showing a broken/empty phone icon if the backend ever
// returns something malformed.
function isValidSocial(social: SocialLink): boolean {
  if (social.icon !== "phone") return true;
  const digits = social.href.replace("tel:", "").replace(/[^0-9]/g, "");
  return digits.length >= 7;
}

export function Footer() {
  const state = useApi(getProfile);
  const year = new Date().getFullYear();
  const name = state.status === "success" ? state.data.name : "";
  const socials = state.status === "success" ? state.data.socials.filter(isValidSocial) : [];

  return (
    <footer className="border-t border-border">
      <div className="section-container flex flex-col items-center gap-6 px-5 py-9 sm:flex-row sm:justify-between sm:px-8 lg:px-10 xl:px-12">
        <p className="text-sm text-muted">
          © {year} {name}. Built with Next.js & Tailwind CSS.
        </p>

        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover hover:text-accent-hover"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
