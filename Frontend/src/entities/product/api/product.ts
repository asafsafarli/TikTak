import { apiFetch } from "@/shared/api";
import type { Product } from "../model/types";

interface GetProductsParams {
  categoryId?: number;
  search?: string;
  page?: number;
  limit?: number;
}

// `/products` da `/categories` kimi token tələb edir (bax Frontend/API.md).
// Qonaq/şəbəkə xətasında `redirectOnAuthFail:false` — çağıran `ApiError`
// tutub ehtiyat siyahı göstərir.
export function getProducts({
  categoryId,
  search,
  page,
  limit,
}: GetProductsParams = {}) {
  return apiFetch<Product[]>("/products", {
    auth: true,
    redirectOnAuthFail: false,
    params: { category_id: categoryId, search, page, limit },
  });
}
