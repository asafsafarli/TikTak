export const PRODUCT_MEASURES = [
  'kg',
  'gr',
  'litre',
  'ml',
  'meter',
  'cm',
  'mm',
  'piece',
  'packet',
  'box',
] as const

export type ProductMeasure = (typeof PRODUCT_MEASURES)[number]

export interface ProductCategory {
  id: number
  name: string
  img_url?: string | null
  description?: string | null
  created_at?: string
}

export interface Product {
  id: number
  title: string
  img_url: string | null
  description: string
  price: string
  type: ProductMeasure
  created_at: string
  category: ProductCategory
}

export interface ProductInput {
  title: string
  description: string
  price: string
  type: ProductMeasure
  img_url?: string
  category_id: number
}

export interface ProductListParams {
  limit?: number
  page?: number
  search?: string
}
