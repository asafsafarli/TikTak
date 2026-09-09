import { apiFetch } from "@/shared/api";
import type { Campaign } from "../model/types";

// Kampaniyalar landing üçün açıq endpoint-dir (token tələb etmir).
// 5 dəqiqəlik keş: admin dəyişiklikləri bir müddət sonra əks olunur.
export function getCampaigns() {
  return apiFetch<Campaign[]>("/campaigns", { revalidate: 300 });
}
