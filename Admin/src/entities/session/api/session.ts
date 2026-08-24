import { apiFetch } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { AdminProfile, AuthTokens } from '../model/types'

export function loginAdmin(phone: string, password: string) {
  return apiFetch<ApiEnvelope<{ tokens: AuthTokens; profile: AdminProfile }>>(
    '/auth/admin/login',
    { method: 'POST', body: { phone, password }, auth: false },
  )
}

export function fetchAdminProfile() {
  return apiFetch<ApiEnvelope<AdminProfile>>('/admin/profile')
}
