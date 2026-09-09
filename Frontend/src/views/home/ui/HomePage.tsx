import { SiteHeader } from "@/widgets/site-header";
import { PromoHero } from "@/widgets/promo-hero";
import { SpecialOffers } from "@/widgets/special-offers";
import { CompanyStats } from "@/widgets/company-stats";
import { SiteFooter } from "@/widgets/site-footer";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PromoHero />
        <SpecialOffers />
        <CompanyStats />
      </main>
      <SiteFooter />
    </>
  );
}
