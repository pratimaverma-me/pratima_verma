import { apiGet } from "@/lib/api-client";
import { SkillCategory } from "@/types/skill";

export function getSkills(): Promise<SkillCategory[]> {
  return apiGet<SkillCategory[]>("/api/v1/skills");
}
