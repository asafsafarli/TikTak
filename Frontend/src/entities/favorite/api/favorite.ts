import { apiFetch } from "@/shared/api";
import type { Product } from "@/entities/product";

// `/products/favorites` və toggle da `/products` kimi auth tələb edir (bax
// Frontend/API.md) — qonaq/şəbəkə xətasında `redirectOnAuthFail:false`,
// çağıran (FavoriteProvider) boş siyahı ilə davam edir.
export function getFavorites() {
  return apiFetch<Product[]>("/products/favorites", {
    auth: true,
    redirectOnAuthFail: false,
  });
}

// Toggle — eyni endpoint həm əlavə edir, həm çıxarır. Cavab `data: null`
// qaytarır, ona görə çağıran tərəf (context) state-i optimistic idarə edir.
export function toggleFavorite(productId: number) {
  return apiFetch<null>(`/products/${productId}/favorite`, {
    method: "POST",
    auth: true,
    redirectOnAuthFail: false,
  });
}
