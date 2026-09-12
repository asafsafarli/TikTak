"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/widgets/site-header";
import { CartSidebar } from "@/widgets/cart-sidebar";
import { Container } from "@/shared/ui/container";
import { QuantityStepper } from "@/shared/ui/quantity-stepper";
import { FavoritesIcon } from "@/shared/ui/icons";
import { useBasket } from "@/entities/basket";
import { useFavorite } from "@/entities/favorite";
import {
  FALLBACK_PRODUCTS,
  getProduct,
  unitLabel,
  type Product,
} from "@/entities/product";
import { formatPrice } from "@/shared/lib/format-price";

function fallbackFor(productId: number): Product {
  return (
    FALLBACK_PRODUCTS.find((product) => product.id === productId) ??
    FALLBACK_PRODUCTS[0]
  );
}

export function ProductDetailPage({ productId }: { productId: number }) {
  // `CategoryDetailPage`-in eyni ehtiyat-siyahı naxışı: API əlçatmasa (və ya
  // qonaq token-siz açsa) ehtiyat məhsulla açılır.
  const [product, setProduct] = useState<Product>(() => fallbackFor(productId));

  useEffect(() => {
    let active = true;
    getProduct(productId)
      .then((data) => {
        if (active) setProduct(data);
      })
      .catch(() => {
        /* 401 / şəbəkə xətası — ehtiyat məhsul qalır */
      });
    return () => {
      active = false;
    };
  }, [productId]);

  const { quantityOf, addOne, removeOne } = useBasket();
  const { isFavorite, toggle } = useFavorite();
  const quantity = quantityOf(product.id);
  const favorite = isFavorite(product.id);

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
            <Link href={`/category/${product.category.id}`} className="hover:opacity-70">
              {product.category.name}
            </Link>
            {" / "}
            <span>{product.title}</span>
          </nav>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-5">
            <div className="flex flex-1 flex-col gap-6 rounded-[10px] bg-white p-6 shadow-[0px_0px_10px_0px_#0000001C] sm:flex-row">
              <span className="mx-auto flex h-[240px] w-[240px] shrink-0 items-center justify-center overflow-hidden rounded-lg sm:mx-0">
                {product.img_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.img_url}
                    alt={product.title}
                    className="size-full object-contain"
                  />
                ) : (
                  <span aria-hidden className="text-5xl font-extrabold text-neutral-300">
                    {product.title.charAt(0)}
                  </span>
                )}
              </span>

              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[24px] font-bold leading-tight text-ink">
                    {product.title}
                  </h1>
                  <span className="text-[20px] font-semibold text-ink">
                    {formatPrice(product.price)}
                  </span>
                </div>

                {product.description ? (
                  <p className="text-[14px] leading-relaxed text-muted">
                    {product.description}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-3">
                  {quantity > 0 ? (
                    <QuantityStepper
                      quantity={quantity}
                      unitLabel={unitLabel(product.type)}
                      onIncrement={() => addOne(product)}
                      onDecrement={() => removeOne(product.id)}
                      className="w-fit bg-neutral-100 px-2 py-1.5"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => addOne(product)}
                      className="rounded-full bg-leaf px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Səbətə əlavə et
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => toggle(product)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                      favorite
                        ? "border-transparent bg-[#F0847A]/10 text-[#F0847A]"
                        : "border-neutral-200 text-ink hover:bg-neutral-100"
                    }`}
                  >
                    <FavoritesIcon className="size-4" />
                    {favorite ? "Siyahımdan çıxar" : "Siyahıma əlavə et"}
                  </button>
                </div>
              </div>
            </div>

            <CartSidebar className="lg:w-[375px] lg:shrink-0" />
          </div>
        </Container>
      </main>
    </>
  );
}
