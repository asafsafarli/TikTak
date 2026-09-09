import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { HERO_SLIDES } from "@/shared/config/site";

const TONE: Record<string, string> = {
  green:
    "bg-[radial-gradient(circle_at_80%_20%,#25a04d,transparent_55%),linear-gradient(120deg,#1c8a3f,#12692f)]",
  red: "bg-[radial-gradient(circle_at_15%_85%,#a23a3a,transparent_50%),linear-gradient(120deg,#7c2727,#5e1d1d)]",
};

export function PromoHero() {
  return (
    <section className="pt-8 sm:pt-10">
      <Container>
        <div className="relative">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {HERO_SLIDES.map((slide) => (
              <article
                key={slide.id}
                className={`relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white sm:min-h-[248px] sm:p-8 ${TONE[slide.tone]}`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:22px_22px]"
                />
                <div className="relative">
                  <h2 className="text-2xl font-extrabold leading-tight sm:text-[28px]">
                    {slide.title}
                  </h2>
                  {slide.subtitle ? (
                    <p className="mt-1 text-lg font-semibold text-white/90">
                      {slide.subtitle}
                    </p>
                  ) : null}
                  {slide.period ? (
                    <p className="mt-2 text-sm text-white/75">{slide.period}</p>
                  ) : null}
                </div>

                <Link
                  href={slide.href}
                  className="relative inline-flex w-fit items-center rounded-lg bg-black/80 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black"
                >
                  {slide.cta}
                </Link>
              </article>
            ))}
          </div>

          <button
            type="button"
            aria-label="Əvvəlki"
            className="absolute top-1/2 -left-3 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-ink shadow-sm transition-colors hover:bg-neutral-50 lg:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Növbəti"
            className="absolute top-1/2 -right-3 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-ink shadow-sm transition-colors hover:bg-neutral-50 lg:flex"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
