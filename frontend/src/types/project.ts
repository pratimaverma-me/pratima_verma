export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  period: string;
  description: string;
  highlights: string[];
  techStack: string[];
  imageUrl: string | null;
  links: ProjectLink[];
  featured: boolean;
  metrics: ProjectMetric[];
  metricsNote: string | null;
  benchmarkBreakdown: ProjectMetric[];
}
