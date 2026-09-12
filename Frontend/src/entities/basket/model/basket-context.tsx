"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "@/entities/session";
import type { Product } from "@/entities/product";
import {
  addToBasket,
  clearBasket as clearBasketRequest,
  getBasket,
  removeAllFromBasket,
  removeFromBasket,
} from "../api/basket";
import type { BasketLine, BasketResponse } from "./types";

interface BasketContextValue {
  lines: BasketLine[];
  count: number;
  total: number;
  quantityOf: (productId: number) => number;
  addOne: (product: Product) => void;
  removeOne: (productId: number) => void;
  removeAll: (productId: number) => void;
  clear: () => void;
}

const BasketContext = createContext<BasketContextValue | null>(null);

function toLines(basket: BasketResponse): BasketLine[] {
  return basket.items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
  }));
}

// Girişli istifadəçi üçün səbət Basket API-sına tam güvənir (bax
// Frontend/API.md) — hər əməliyyat server-ə gedir, cavabdakı tam siyahı ilə
// state əvəzlənir (optimistic update yoxdur). Backend basket endpoint-lərinin
// hamısında auth tələb etdiyindən (qonaq 401 alır) qonaq üçün səbət sadəcə
// yaddaşda saxlanılır — checkout da onsuz da auth tələb etdiyi üçün bu hələlik
// problem yaratmır (giriş edəndə qonaq səbəti sıfırlanır, server-in öz
// səbəti ilə əvəzlənir).
export function BasketProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession();
  const [lines, setLines] = useState<BasketLine[]>([]);

  // Giriş vəziyyəti dəyişəndə (login/logout) səbət sıfırlanır — render
  // zamanı müqayisə edilir ki, effekt daxilində sinxron `setState` olmasın
  // (React-ın "prop dəyişəndə state-i düzəlt" naxışı, effekt yox).
  const [trackedAuth, setTrackedAuth] = useState(isAuthenticated);
  if (trackedAuth !== isAuthenticated) {
    setTrackedAuth(isAuthenticated);
    setLines([]);
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    getBasket()
      .then((data) => {
        if (active) setLines(toLines(data));
      })
      .catch(() => {
        /* şəbəkə xətası — səbət boş görünür, sonrakı əməliyyatlar yenidən cəhd edir */
      });
    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  const addOne = useCallback(
    (product: Product) => {
      if (!isAuthenticated) {
        setLines((prev) => {
          const existing = prev.find((line) => line.product.id === product.id);
          if (existing) {
            return prev.map((line) =>
              line.product.id === product.id
                ? { ...line, quantity: line.quantity + 1 }
                : line,
            );
          }
          return [...prev, { product, quantity: 1 }];
        });
        return;
      }
      addToBasket(product.id)
        .then((data) => setLines(toLines(data)))
        .catch(() => {});
    },
    [isAuthenticated],
  );

  const removeOne = useCallback(
    (productId: number) => {
      if (!isAuthenticated) {
        setLines((prev) =>
          prev
            .map((line) =>
              line.product.id === productId
                ? { ...line, quantity: line.quantity - 1 }
                : line,
            )
            .filter((line) => line.quantity > 0),
        );
        return;
      }
      removeFromBasket(productId)
        .then((data) => setLines(toLines(data)))
        .catch(() => {});
    },
    [isAuthenticated],
  );

  const removeAll = useCallback(
    (productId: number) => {
      if (!isAuthenticated) {
        setLines((prev) => prev.filter((line) => line.product.id !== productId));
        return;
      }
      removeAllFromBasket(productId)
        .then((data) => setLines(toLines(data)))
        .catch(() => {});
    },
    [isAuthenticated],
  );

  const clear = useCallback(() => {
    if (!isAuthenticated) {
      setLines([]);
      return;
    }
    clearBasketRequest()
      .then((data) => setLines(toLines(data)))
      .catch(() => {});
  }, [isAuthenticated]);

  const quantityOf = useCallback(
    (productId: number) =>
      lines.find((line) => line.product.id === productId)?.quantity ?? 0,
    [lines],
  );

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const total = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + Number(line.product.price) * line.quantity,
        0,
      ),
    [lines],
  );

  return (
    <BasketContext.Provider
      value={{ lines, count, total, quantityOf, addOne, removeOne, removeAll, clear }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}
