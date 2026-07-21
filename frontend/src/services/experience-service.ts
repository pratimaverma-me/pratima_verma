import { apiGet } from "@/lib/api-client";
import { ExperienceItem } from "@/types/experience";

export function getExperience(): Promise<ExperienceItem[]> {
  return apiGet<ExperienceItem[]>("/api/v1/experience");
}
