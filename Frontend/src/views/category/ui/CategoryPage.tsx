"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/widgets/site-header";
import { OrderPromo } from "@/widgets/order-promo";
import { CategoryGrid } from "@/widgets/category-grid";
import { Container } from "@/shared/ui/container";
import {
  FALLBACK_CATEGORIES,
  getCategories,
  type Category,
} from "@/entities/category";

export function CategoryPage() {
  // API əlçatmasa (və ya qonaq token-siz açsa) səhifə ehtiyat siyahı ilə açılır.
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

  return (
    <>
      <SiteHeader variant="storefront" />
      <main className="flex-1 bg-[#F4F4F6] py-8 sm:py-10">
        <Container>
          <h1 className="sr-only">Kateqoriyalar</h1>
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
            <OrderPromo className="lg:w-[300px] lg:shrink-0" />
            <div className="flex-1">
              <CategoryGrid categories={categories} />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
