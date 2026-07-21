export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone";
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  journey: string;
  enjoysBuilding: string;
  focusAreas: string[];
  availability: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  socials: SocialLink[];
}
