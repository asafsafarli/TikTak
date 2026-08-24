export interface AdminUser {
  id: number
  full_name: string
  phone: string
  email?: string | null
  address: string | null
  img_url: string | null
  role: string
  created_at: string
}
