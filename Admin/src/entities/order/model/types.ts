export const ORDER_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'DELIVERED',
  'CANCELLED',
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export interface OrderUser {
  id: number
  full_name: string
  img_url: string | null
}

export interface OrderItemProduct {
  id: number
  title: string
  img_url: string | null
  description: string
  price: string
  type: string
  created_at: string
  category?: { id: number; name: string }
}

export interface OrderItem {
  id: number
  quantity: number
  total_price: string
  product: OrderItemProduct
}

export interface Order {
  id: number
  orderNumber: string
  total: string
  deliveryFee: string
  paymentMethod: 'CARD' | 'CASH'
  status: OrderStatus
  note: string | null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
  user: OrderUser
  items: OrderItem[]
}
