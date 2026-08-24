import { API_BASE_URL } from '@/shared/config/env'
import { tokenStorage } from '@/shared/lib/token-storage'
import { ApiError } from './client'
import type { ApiEnvelope } from './types'

export async function uploadFile(file: File): Promise<ApiEnvelope<{ url: string }>> {
  const token = tokenStorage.getAccessToken()
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(data?.message ?? 'Upload failed', response.status)
  }

  return data
}
