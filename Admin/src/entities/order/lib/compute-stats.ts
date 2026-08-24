import { ORDER_STATUSES, type Order, type OrderStatus } from '../model/types'

export interface OrderStats {
  total: number
  totalRevenue: number
  byStatus: Record<OrderStatus, number>
}

export function computeOrderStats(orders: Order[]): OrderStats {
  const byStatus = ORDER_STATUSES.reduce(
    (acc, status) => {
      acc[status] = 0
      return acc
    },
    {} as Record<OrderStatus, number>,
  )

  let totalRevenue = 0
  for (const order of orders) {
    byStatus[order.status] += 1
    totalRevenue += Number(order.total)
  }

  return { total: orders.length, totalRevenue, byStatus }
}
