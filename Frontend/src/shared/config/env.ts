// API kök URL-i. `.env` faylında NEXT_PUBLIC_API_BASE_URL ilə əvəz oluna bilər.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://api.sarkhanrahimli.dev/api/tiktak";
