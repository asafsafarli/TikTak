import { Map, ShoppingCart, Store, Users } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { COMPANY_STATS } from "@/shared/config/site";

const ICONS = {
  store: Store,
  map: Map,
  cart: ShoppingCart,
  users: Users,
};

export function CompanyStats() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Bizim göstəricilər
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Biz yeni imkanlar axtarırıq və digərlərinin bilmədikləri yerlərə getməyə
          hazırıq.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {COMPANY_STATS.map((stat) => {
            const Icon = ICONS[stat.icon];
            return (
              <div
                key={stat.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <dd className="text-4xl font-extrabold tracking-tight text-brand-dark sm:text-[42px]">
                  {stat.value}
                </dd>
                <dt className="mt-4 flex items-center justify-between text-sm text-muted">
                  {stat.label}
                  <Icon className="size-5 text-brand" strokeWidth={1.75} />
                </dt>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
