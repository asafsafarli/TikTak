import { apiFetch } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { Category, CategoryInput } from '../model/types'

export function listCategories() {
  return apiFetch<ApiEnvelope<Category[]>>('/admin/categories')
}

export function createCategory(input: CategoryInput) {
  return apiFetch<ApiEnvelope<Category>>('/admin/category', { method: 'POST', body: input })
}

export function updateCategory(id: number, input: CategoryInput) {
  return apiFetch<ApiEnvelope<Category>>(`/admin/categories/${id}`, {
    method: 'PUT',
    body: input,
  })
}

export function removeCategory(id: number) {
  return apiFetch<ApiEnvelope<null>>(`/admin/categories/${id}`, { method: 'DELETE' })
}
