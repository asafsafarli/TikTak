"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/entities/session";

type AuthView = "login" | "register";

const TABS: { view: AuthView; href: string; label: string }[] = [
  { view: "login", href: "/login", label: "Daxil ol" },
  { view: "register", href: "/register", label: "Qeydiyyatdan keç" },
];

interface AuthShellProps {
  active: AuthView;
  children: ReactNode;
}

export function AuthShell({ active, children }: AuthShellProps) {
  const { isAuthenticated, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/");
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="grid flex-1 md:grid-cols-2">
      <aside className="relative hidden items-center justify-center overflow-hidden bg-leaf md:flex">
        <span className="absolute left-8 top-8 z-10 text-[44px] font-extrabold leading-none tracking-[0.03em] text-[#2B3043] lg:left-12 lg:top-12 lg:text-[64px] xl:text-[80px]">
          TIK TAK
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/strawberry.svg"
          alt=""
          aria-hidden
          className="pointer-events-none w-[210%] max-w-none object-contain"
        />
      </aside>

      <div className="flex items-center justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-16">
        <div className="w-full max-w-[566px]">
            <nav className="flex justify-center gap-[clamp(1.75rem,9vw,138px)] border-b border-neutral-200">
              {TABS.map((tab) => (
                <Link
                  key={tab.view}
                  href={tab.href}
                  className={`-mb-px whitespace-nowrap border-b-2 pb-3 text-[26px] font-normal leading-none tracking-normal text-[#1A1D28] ${
                    tab.view === active
                      ? "border-[#92D871]"
                      : "border-transparent"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8">{children}</div>

            <p className="mt-4 text-[18px] font-light leading-none text-muted">
              {active === "login" ? (
                <>
                  Hesabın yoxdursa{" "}
                  <Link
                    href="/register"
                    className="font-medium text-[#92D871]"
                  >
                    Qeydiyyatdan keç
                  </Link>
                </>
              ) : (
                <>
                  Hesabın varsa{" "}
                  <Link href="/login" className="font-medium text-[#92D871]">
                    Daxil ol
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
  );
}
