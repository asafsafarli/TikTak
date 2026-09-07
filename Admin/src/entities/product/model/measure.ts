import type { ProductMeasure } from './types'

// Növ (ProductMeasure) üçün göstəriş etiketləri — cədvəl badge-i və formadakı seçim.
export const PRODUCT_MEASURE_LABEL: Record<ProductMeasure, string> = {
  kg: 'Kiloqram',
  gr: 'Qram',
  litre: 'Litr',
  ml: 'Millilitr',
  meter: 'Metr',
  cm: 'Santimetr',
  mm: 'Millimetr',
  piece: 'Ədəd',
  packet: 'Paket',
  box: 'Qutu',
}
