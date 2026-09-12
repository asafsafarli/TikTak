import { apiFetch } from "@/shared/api";
import type { BasketResponse } from "../model/types";

// Basket sətirləri `product_id`-yə görə idarə olunur, body qəbul etmir,
// hər əməliyyat yenilənmiş basket-in tamını qaytarır (bax Frontend/API.md).
export function getBasket() {
  return apiFetch<BasketResponse>("/basket", {
    auth: true,
    redirectOnAuthFail: false,
  });
}

export function addToBasket(productId: number) {
  return apiFetch<BasketResponse>(`/basket/${productId}/add`, {
    method: "POST",
    auth: true,
    redirectOnAuthFail: false,
  });
}

export function removeFromBasket(productId: number) {
  return apiFetch<BasketResponse>(`/basket/${productId}/remove`, {
    method: "POST",
    auth: true,
    redirectOnAuthFail: false,
  });
}

export function removeAllFromBasket(productId: number) {
  return apiFetch<BasketResponse>(`/basket/${productId}/remove-all`, {
    method: "DELETE",
    auth: true,
    redirectOnAuthFail: false,
  });
}

export function clearBasket() {
  return apiFetch<BasketResponse>("/basket/clear", {
    method: "DELETE",
    auth: true,
    redirectOnAuthFail: false,
  });
}
