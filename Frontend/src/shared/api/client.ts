import { API_BASE_URL } from "@/shared/config/env";
import type { ApiEnvelope } from "./types";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  params?: Record<string, string | number | undefined>;
  token?: string;
  // Server Component-lərdə keş ömrü (saniyə). `0` = keşləmə.
  revalidate?: number | false;
}

function buildUrl(path: string, params?: RequestOptions["params"]) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

/**
 * Backend zərfini (`{ message, data, result }`) açıb yalnız `data`-nı qaytarır.
 * Uğursuz cavabda `ApiError` atır.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, params, token, revalidate } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(buildUrl(path, params), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next: revalidate === undefined ? undefined : { revalidate },
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<T>
    | { message?: string | string[] }
    | null;

  if (!response.ok) {
    const raw = payload?.message ?? "Sorğu uğursuz oldu";
    throw new ApiError(
      Array.isArray(raw) ? raw.join(", ") : raw,
      response.status,
    );
  }

  return (payload as ApiEnvelope<T>).data;
}
