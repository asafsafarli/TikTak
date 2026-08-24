export interface ApiEnvelope<T> {
  message: string
  data: T
  result: boolean
}

export interface Pagination {
  next: number | null
  prev: number | null
  current: number
  total: number
  totalPages: number
}

export interface PaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  pagination: Pagination
}
