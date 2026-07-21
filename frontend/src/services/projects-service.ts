import { apiGet } from "@/lib/api-client";
import { ProjectItem } from "@/types/project";

export function getProjects(): Promise<ProjectItem[]> {
  return apiGet<ProjectItem[]>("/api/v1/projects");
}
