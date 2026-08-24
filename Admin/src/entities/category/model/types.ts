export interface Category {
  id: number
  name: string
  img_url: string | null
  description: string | null
  created_at: string
}

export interface CategoryInput {
  name: string
  description: string
  img_url?: string
}
