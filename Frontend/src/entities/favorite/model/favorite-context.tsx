"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/entities/session";
import type { Product } from "@/entities/product";
import { getFavorites, toggleFavorite as toggleFavoriteRequest } from "../api/favorite";

interface FavoriteContextValue {
  products: Product[];
  isFavorite: (productId: number) => boolean;
  toggle: (product: Product) => void;
}

const FavoriteContext = createContext<FavoriteContextValue | null>(null);

// `BasketProvider`-in eyni naxışı (bax `entities/basket/model/basket-context.tsx`)
// — girişli istifadəçi üçün siyahı `GET /products/favorites`-dan çəkilir,
// qonaq üçün favoritə əlavə etmək mümkün deyil (toggle onu /login-ə göndərir).
export function FavoriteProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const [trackedAuth, setTrackedAuth] = useState(isAuthenticated);
  if (trackedAuth !== isAuthenticated) {
    setTrackedAuth(isAuthenticated);
    setProducts([]);
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    getFavorites()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch(() => {
        /* şəbəkə xətası — boş siyahı qalır */
      });
    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  const isFavorite = useCallback(
    (productId: number) => products.some((product) => product.id === productId),
    [products],
  );

  const toggle = useCallback(
    (product: Product) => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
      const wasFavorite = products.some((item) => item.id === product.id);
      setProducts((prev) =>
        wasFavorite
          ? prev.filter((item) => item.id !== product.id)
          : [...prev, product],
      );
      toggleFavoriteRequest(product.id).catch(() => {
        // Sorğu uğursuz oldu — server vəziyyətinə görə düzəlt.
        getFavorites()
          .then(setProducts)
          .catch(() => {});
      });
    },
    [isAuthenticated, products, router],
  );

  return (
    <FavoriteContext.Provider value={{ products, isFavorite, toggle }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
}
