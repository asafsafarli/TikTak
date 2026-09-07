import { useEffect, useState } from 'react'
import { XIcon } from 'lucide-react'
import type { Order, OrderStatus } from '@/entities/order'
import { ORDER_STATUSES, ORDER_STATUS_META, useUpdateOrderStatus } from '@/entities/order'
import { ApiError } from '@/shared/api/client'
import { formatDate } from '@/shared/lib/format-date'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/ui/dialog'

const MANAT = '₼'

const PAYMENT_LABEL: Record<Order['paymentMethod'], string> = {
  CARD: 'Kart',
  CASH: 'Nağd',
}

interface OrderDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function OrderDetailDialog({ open, onOpenChange, order }: OrderDetailDialogProps) {
  const updateStatus = useUpdateOrderStatus()
  const [status, setStatus] = useState<OrderStatus>('PENDING')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && order) {
      setStatus(order.status)
      setError(null)
    }
  }, [open, order])

  if (!order) return null

  const deliveryFee = Number(order.deliveryFee)
  const total = Number(order.total)
  const subtotal = total - deliveryFee
  const currentOrder = order

  async function handleStatusChange(next: OrderStatus) {
    if (next === currentOrder.status) {
      setStatus(next)
      return
    }
    setStatus(next)
    setError(null)
    try {
      await updateStatus.mutateAsync({ id: currentOrder.id, status: next })
    } catch (err) {
      setStatus(currentOrder.status)
      setError(err instanceof ApiError ? err.message : 'Status yenilənmədi')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="flex max-h-[calc(100vh-4rem)] w-[calc(100%-2rem)] max-w-[640px] flex-col gap-0 overflow-y-auto rounded-[10px] bg-white p-8 shadow-xl sm:max-w-[640px]"
      >
        <DialogClose className="absolute top-6 right-6 text-[#1A1D28] transition-opacity hover:opacity-60">
          <XIcon className="size-4" />
          <span className="sr-only">Bağla</span>
        </DialogClose>

        <DialogTitle className="text-[22px] font-semibold leading-[100%] text-[#2B3043]">
          {order.orderNumber}
        </DialogTitle>
        <p className="mt-2 text-sm text-neutral-500">{formatDate(order.createdAt)}</p>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Müştəri" value={order.user.full_name} />
          <Field label="Telefon" value={order.phone} />
          <Field label="Çatdırılma ünvanı" value={order.address} className="col-span-2" />
          <Field label="Ödəniş" value={PAYMENT_LABEL[order.paymentMethod]} />
          <Field
            label="Çatdırılma haqqı"
            value={deliveryFee === 0 ? 'Pulsuz' : `${deliveryFee.toFixed(2)} ${MANAT}`}
          />
          {order.note ? <Field label="Qeyd" value={order.note} className="col-span-2" /> : null}
        </div>

        <div className="mt-6 border-t border-[#EDEEF2] pt-4">
          <p className="text-sm font-medium text-[#2B3043]">Məhsullar</p>
          <ul className="mt-3 flex flex-col gap-2">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between text-sm text-[#2B3043]"
              >
                <span className="font-light">
                  {item.product.title} <span className="text-neutral-400">× {item.quantity}</span>
                </span>
                <span className="font-light">
                  {Number(item.total_price).toFixed(2)} {MANAT}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-col gap-1 border-t border-[#EDEEF2] pt-4 text-sm">
          <Row label="Ara cəm" value={`${subtotal.toFixed(2)} ${MANAT}`} />
          <Row
            label="Çatdırılma"
            value={deliveryFee === 0 ? 'Pulsuz' : `${deliveryFee.toFixed(2)} ${MANAT}`}
          />
          <Row label="Cəmi" value={`${total.toFixed(2)} ${MANAT}`} strong />
        </div>

        <div className="mt-6">
          <label htmlFor="order-status" className="text-sm font-medium text-[#2B3043]">
            Status
          </label>
          <select
            id="order-status"
            value={status}
            onChange={(event) => handleStatusChange(event.target.value as OrderStatus)}
            disabled={updateStatus.isPending}
            className="mt-2 h-11 w-full rounded-[10px] border-0 bg-[#F4F4F9] px-4 text-sm text-[#2B3043] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#92D871]/50 disabled:opacity-60"
          >
            {ORDER_STATUSES.map((value) => (
              <option key={value} value={value}>
                {ORDER_STATUS_META[value].label}
              </option>
            ))}
          </select>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={className}>
      <p className="text-xs tracking-wide text-neutral-400 uppercase">{label}</p>
      <p className="mt-1 text-sm font-light break-words text-[#2B3043]">{value}</p>
    </div>
  )
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={strong ? 'font-semibold text-[#2B3043]' : 'text-neutral-500'}>{label}</span>
      <span className={strong ? 'font-semibold text-[#2B3043]' : 'font-light text-[#2B3043]'}>
        {value}
      </span>
    </div>
  )
}
