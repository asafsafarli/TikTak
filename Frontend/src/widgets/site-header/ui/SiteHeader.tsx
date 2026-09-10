"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { BasketIcon, FavoritesIcon, UserIcon } from "@/shared/ui/icons";
import { HEADER_NAV } from "@/shared/config/site";
import { useSession } from "@/entities/session";

const ICONS = {
  user: UserIcon,
  favorites: FavoritesIcon,
  basket: BasketIcon,
};

interface SiteHeaderProps {
  // "storefront" — ünvan seçicisi + axtarış sahəsi əlavə olunur (mağaza səhifələri).
  variant?: "landing" | "storefront";
}

export function SiteHeader({ variant = "landing" }: SiteHeaderProps) {
  const { isAuthenticated, profile } = useSession();
  const storefront = variant === "storefront";

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <Container
        className={`flex h-[88px] items-center gap-4 ${
          storefront ? "sm:gap-6" : "justify-between"
        }`}
      >
        <Link
          href="/"
          className="shrink-0 font-extrabold leading-none tracking-[0.03em] text-[#2B3043] text-[28px] sm:text-[40px]"
        >
          TIK TAK
        </Link>

        {storefront ? (
          <>
            <Link
              href={isAuthenticated ? "/profile" : "/login"}
              className="hidden shrink-0 flex-col rounded-xl bg-neutral-100 px-4 py-2 text-left transition-colors hover:bg-neutral-200/70 md:flex md:max-w-[200px] lg:max-w-[240px]"
            >
              <span className="text-[13px] font-bold leading-tight text-[#2B3043]">
                Ünvan
              </span>
              <span className="truncate text-[12px] leading-tight text-muted">
                {profile?.address ?? "Adres qeyd olunmayıb"}
              </span>
            </Link>

            <form className="relative flex min-w-0 flex-1" role="search">
              <label htmlFor="site-search" className="sr-only">
                Axtarış
              </label>
              <input
                id="site-search"
                type="search"
                placeholder="Axtarış"
                className="h-11 w-full rounded-xl bg-neutral-100 pl-4 pr-10 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:bg-neutral-200/60"
              />
              <Search
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
              />
            </form>
          </>
        ) : null}

        <nav className="flex shrink-0 items-center gap-4 sm:gap-7">
          {HEADER_NAV.map((item) => {
            const Icon = ICONS[item.icon];
            // Giriş edilməyibsə bu bölmələr login-ə aparır; edilibsə öz
            // səhifəsinə (səhifələr hazır olana qədər `item.href` = "#").
            const href = isAuthenticated ? item.href : "/login";
            return (
              <Link
                key={item.label}
                href={href}
                className="flex items-center gap-2 text-[14px] font-normal leading-none tracking-normal text-[#2B3043] transition-opacity hover:opacity-70"
              >
                <Icon className="h-4 w-auto shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
