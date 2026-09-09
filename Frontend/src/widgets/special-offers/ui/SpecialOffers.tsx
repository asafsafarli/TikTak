import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { SPECIAL_OFFERS } from "@/shared/config/site";

const TONE: Record<string, string> = {
  stone:
    "bg-[linear-gradient(135deg,#3a3a3a,#232323)] ring-1 ring-white/5",
  red: "bg-[radial-gradient(circle_at_85%_15%,#b23c3c,transparent_55%),linear-gradient(135deg,#8a2b2b,#611c1c)]",
};

export function SpecialOffers() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Xüsusi təkliflər!
        </h2>
        <p className="mt-2 text-sm text-muted">
          BRAVO-da hər gün üçün super təklifləri qaçırmayın!
        </p>

        <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
          {SPECIAL_OFFERS.map((offer) => (
            <Link
              key={offer.id}
              href={offer.href}
              className={`group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white transition-transform hover:-translate-y-0.5 sm:p-8 ${TONE[offer.tone]}`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"
              />
              <div className="relative">
                <h3 className="max-w-[70%] text-xl font-extrabold leading-tight sm:text-2xl">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm text-white/75">{offer.period}</p>
              </div>

              {offer.badge ? (
                <span className="relative w-fit rounded-md bg-[#f5c518] px-3 py-1 text-xs font-bold tracking-wide text-black">
                  {offer.badge}
                </span>
              ) : (
                <span className="relative text-sm font-semibold text-white/90 underline-offset-4 group-hover:underline">
                  Ətraflı
                </span>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
