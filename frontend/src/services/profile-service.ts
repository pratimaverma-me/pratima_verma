import { apiGet } from "@/lib/api-client";
import { ProfileData } from "@/types/profile";

export function getProfile(): Promise<ProfileData> {
  return apiGet<ProfileData>("/api/v1/profile");
}
