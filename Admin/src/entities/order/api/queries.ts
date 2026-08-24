import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { listOrders, updateOrderStatus } from './order'
import type { OrderStatus } from '../model/types'

export const orderKeys = {
  list: ['orders'] as const,
}

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.list,
    queryFn: async () => (await listOrders()).data,
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.list }),
  })
}
