import { apiGet } from "@/lib/api-client";
import { HealthData } from "@/types/api";

export function getHealth(): Promise<HealthData> {
  return apiGet<HealthData>("/api/v1/health");
}
