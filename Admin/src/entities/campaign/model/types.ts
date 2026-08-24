export interface Campaign {
  id: number
  title: string
  description: string | null
  img_url: string | null
  created_at: string
}

export interface CampaignInput {
  title: string
  description: string
  img_url?: string
}
