import { apiPost } from "@/lib/api-client";
import { ContactRequest, ContactResponseData } from "@/types/contact";

export function postContact(payload: ContactRequest): Promise<ContactResponseData> {
  return apiPost<ContactResponseData>("/api/v1/contact", payload);
}
