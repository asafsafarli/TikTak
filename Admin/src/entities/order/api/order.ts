import { apiFetch } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { Order, OrderStatus } from '../model/types'

export function listOrders() {
  return apiFetch<ApiEnvelope<Order[]>>('/orders/admin')
}

export function updateOrderStatus(id: number, status: OrderStatus) {
  return apiFetch<ApiEnvelope<Order>>(`/orders/admin/${id}/status`, {
    method: 'PUT',
    body: { status },
  })
}
