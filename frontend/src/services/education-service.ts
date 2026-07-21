import { apiGet } from "@/lib/api-client";
import { EducationItem } from "@/types/education";

export function getEducation(): Promise<EducationItem[]> {
  return apiGet<EducationItem[]>("/api/v1/education");
}
