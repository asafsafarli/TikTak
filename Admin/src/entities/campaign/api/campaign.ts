import { apiFetch } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { Campaign, CampaignInput } from '../model/types'

export function listCampaigns() {
  return apiFetch<ApiEnvelope<Campaign[]>>('/admin/campaigns')
}

export function createCampaign(input: CampaignInput) {
  return apiFetch<ApiEnvelope<Campaign>>('/admin/campaign', { method: 'POST', body: input })
}

export function updateCampaign(id: number, input: CampaignInput) {
  return apiFetch<ApiEnvelope<Campaign>>(`/admin/campaigns/${id}`, {
    method: 'PUT',
    body: input,
  })
}

export function removeCampaign(id: number) {
  return apiFetch<ApiEnvelope<null>>(`/admin/campaigns/${id}`, { method: 'DELETE' })
}
