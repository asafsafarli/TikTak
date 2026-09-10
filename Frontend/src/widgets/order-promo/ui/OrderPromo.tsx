/**
 * Kateqoriyalar səhifəsinin sol tərəfindəki yaşıl promo kartı:
 * çiyələk şəkli + "15 dəqiqəyə qapında" mesajı.
 */
export function OrderPromo({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl bg-[#8BC53F] p-6 text-white sm:p-8 lg:min-h-[420px] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/strawberry.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-8 left-1/2 w-[115%] max-w-none -translate-x-1/2 select-none sm:-top-4 sm:w-[130%]"
      />

      <div className="relative [text-shadow:0_1px_10px_rgba(0,0,0,0.18)]">
        <p className="text-base font-bold uppercase leading-none sm:text-lg">
          Online sifariş et
        </p>
        <div className="mt-3 flex items-center gap-4">
          <span className="text-[64px] font-extrabold leading-none sm:text-[84px]">
            15
          </span>
          <span className="text-xl font-extrabold uppercase leading-[1.1] sm:text-2xl">
            Dəqiqəyə
            <br />
            Qapında
          </span>
        </div>
      </div>
    </aside>
  );
}
