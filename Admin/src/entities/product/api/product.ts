import { apiFetch } from '@/shared/api/client'
import type { ApiEnvelope, PaginatedEnvelope } from '@/shared/api/types'
import type { Product, ProductInput, ProductListParams } from '../model/types'

export function listProducts(params: ProductListParams = {}) {
  return apiFetch<PaginatedEnvelope<Product>>('/admin/products', {
    params: params as Record<string, unknown>,
  })
}

export function createProduct(input: ProductInput) {
  return apiFetch<ApiEnvelope<Product>>('/admin/product', { method: 'POST', body: input })
}

export function updateProduct(id: number, input: ProductInput) {
  return apiFetch<ApiEnvelope<Product>>(`/admin/products/${id}`, { method: 'PUT', body: input })
}

export function removeProduct(id: number) {
  return apiFetch<ApiEnvelope<null>>(`/admin/products/${id}`, { method: 'DELETE' })
}
