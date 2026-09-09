import Link from "next/link";
import { LogIn, ShoppingBasket, User } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { HEADER_NAV } from "@/shared/config/site";

const ICONS = {
  user: User,
  login: LogIn,
  basket: ShoppingBasket,
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-[0.08em] text-ink"
        >
          TIK TAK
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {HEADER_NAV.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-brand-soft hover:text-brand-dark"
              >
                <Icon className="size-4" strokeWidth={1.75} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
