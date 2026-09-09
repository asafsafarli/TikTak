import { API_BASE_URL } from "@/shared/config/env";
import { tokenStorage } from "@/shared/lib/token-storage";

// `apiFetch` 401 alanda bunu çağırır. Eyni anda bir neçə sorğu 401 alsa belə
// refresh yalnız bir dəfə gedir (in-flight promise paylaşılır). Bir dəfə uğursuz
// olandan sonra latch qalır — səhifə yenilənənə / yenidən login olunana qədər.
let inFlight: Promise<boolean> | null = null;
let refreshFailed = false;

export function refreshAccessToken(): Promise<boolean> {
  if (refreshFailed) return Promise.resolve(false);
  inFlight ??= runRefresh().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

async function runRefresh(): Promise<boolean> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    refreshFailed = true;
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      refreshFailed = true;
      return false;
    }

    const json = await response.json().catch(() => null);
    const data = json?.data;
    if (
      typeof data?.access_token !== "string" ||
      typeof data?.refresh_token !== "string"
    ) {
      refreshFailed = true;
      return false;
    }

    tokenStorage.setTokens(data.access_token, data.refresh_token);
    return true;
  } catch {
    // Şəbəkə xətası — latch qoymuruq, sonrakı sorğu təkrar cəhd edə bilər.
    return false;
  }
}
