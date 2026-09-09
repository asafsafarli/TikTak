import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { BasketIcon, FavoritesIcon, UserIcon } from "@/shared/ui/icons";
import { HEADER_NAV } from "@/shared/config/site";

const ICONS = {
  user: UserIcon,
  favorites: FavoritesIcon,
  basket: BasketIcon,
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <Container className="flex h-[88px] items-center justify-between">
        <Link
          href="/"
          className="font-extrabold leading-none tracking-[0.03em] text-[#2B3043] text-[28px] sm:text-[40px]"
        >
          TIK TAK
        </Link>

        <nav className="flex items-center gap-4 sm:gap-7">
          {HEADER_NAV.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.label}
                href={item.href}
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
