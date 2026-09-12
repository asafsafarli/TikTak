"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/widgets/site-header";
import { CategoryPromo } from "@/widgets/category-promo";
import { CategorySidebar, useVisibleCategories } from "@/widgets/category-sidebar";
import { ProductGrid } from "@/widgets/product-grid";
import { CartSidebar } from "@/widgets/cart-sidebar";
import { Container } from "@/shared/ui/container";
import { FALLBACK_PRODUCTS, getProducts, type Product } from "@/entities/product";

export function CategoryDetailPage({ categoryId }: { categoryId: number }) {
  const { categories, visibleCategories } = useVisibleCategories();
  const activeCategory = categories.find((category) => category.id === categoryId);

  return (
    <>
      <SiteHeader variant="storefront" wide />
      <main className="flex-1 overflow-x-hidden bg-[#F4F4F6] py-8 sm:py-10">
        <Container wide className="flex flex-col gap-5">
          <nav
            aria-label="Breadcrumb"
            className="text-[20px] font-normal leading-none text-ink"
          >
            <Link href="/" className="hover:opacity-70">
              Ana səhifə
            </Link>
            {" / "}
            <span>{activeCategory?.name ?? "Kateqoriya"}</span>
          </nav>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-5">
            <div className="flex flex-col gap-5 lg:w-[338px] lg:shrink-0">
              <CategorySidebar
                categories={visibleCategories}
                activeCategoryId={categoryId}
              />
              <CategoryPromo className="lg:shrink-0" />
            </div>

            <div className="flex-1">
              <h1 className="sr-only">{activeCategory?.name ?? "Kateqoriya"}</h1>
              {/* `key`: kateqoriya dəyişəndə (sidebar-dan başqasına keçid) köhnə
                  kateqoriyanın məhsulları qalmasın deyə komponent təzədən quraşdırılır. */}
              <CategoryProducts key={categoryId} categoryId={categoryId} />
            </div>

            <CartSidebar className="lg:w-[375px] lg:shrink-0" />
          </div>
        </Container>
      </main>
    </>
  );
}

function CategoryProducts({ categoryId }: { categoryId: number }) {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);

  useEffect(() => {
    let active = true;
    getProducts({ categoryId })
      .then((data) => {
        if (active && data.length > 0) setProducts(data);
      })
      .catch(() => {
        /* 401 / şəbəkə xətası — ehtiyat siyahı qalır */
      });
    return () => {
      active = false;
    };
  }, [categoryId]);

  return <ProductGrid products={products} />;
}
