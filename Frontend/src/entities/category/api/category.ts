import { apiFetch } from "@/shared/api";
import type { Category } from "../model/types";

// `/categories` token tələb edir (kampaniyalardan fərqli olaraq açıq deyil).
// Client-də çağırılır (token `localStorage`-dədir). `redirectOnAuthFail: false`
// — qonaq 401 alanda /login-ə atılmır, çağıran `ApiError` tutub ehtiyat
// siyahını göstərir.
export function getCategories() {
  return apiFetch<Category[]>("/categories", {
    auth: true,
    redirectOnAuthFail: false,
  });
}
