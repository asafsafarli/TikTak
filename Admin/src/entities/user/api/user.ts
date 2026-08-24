import { apiFetch } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { AdminUser } from '../model/types'

export function listUsers() {
  return apiFetch<ApiEnvelope<AdminUser[]>>('/admin/users')
}
