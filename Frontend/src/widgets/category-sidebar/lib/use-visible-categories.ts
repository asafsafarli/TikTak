"use client";

import { useEffect, useState } from "react";
import {
  FALLBACK_CATEGORIES,
  getCategories,
  type Category,
} from "@/entities/category";
import { FALLBACK_PRODUCTS, getProducts } from "@/entities/product";

// `CategorySidebar` yalnız məhsulu olan kateqoriyaları göstərir. Hansı
// kateqoriyalarda məhsul olduğunu bilmək üçün geniş (kateqoriya filtri
// olmadan) bir sorğu atılır və nəticədəki məhsulların `category.id`-ləri
// toplanır — məhsul sayı üçün ayrıca endpoint olmadığından bu, ən yaxın
// praktiki yoldur (ilk səhifədən kənarda qalan məhsulların kateqoriyaları
// görünməyə bilər). `CategoryDetailPage` və `ProductDetailPage`-in ortaq
// naxışı — hər ikisi kateqoriya sidebar-ını göstərir.
export function useVisibleCategories() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => {
        if (active && data.length > 0) setCategories(data);
      })
      .catch(() => {
        /* 401 / şəbəkə xətası — ehtiyat siyahı qalır */
      });
    return () => {
      active = false;
    };
  }, []);

  const [categoryIdsWithProducts, setCategoryIdsWithProducts] = useState(
    () => new Set(FALLBACK_PRODUCTS.map((product) => product.category.id)),
  );

  useEffect(() => {
    let active = true;
    getProducts({ limit: 100 })
      .then((data) => {
        if (active && data.length > 0) {
          setCategoryIdsWithProducts(
            new Set(data.map((product) => product.category.id)),
          );
        }
      })
      .catch(() => {
        /* 401 / şəbəkə xətası — ehtiyat siyahıdan hesablanan set qalır */
      });
    return () => {
      active = false;
    };
  }, []);

  return {
    categories,
    visibleCategories: categories.filter((category) =>
      categoryIdsWithProducts.has(category.id),
    ),
  };
}
