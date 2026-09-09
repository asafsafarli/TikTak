import Link from "next/link";
import { Globe } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { SocialIcon } from "@/shared/ui/social-icon";
import { FOOTER_SECTIONS, SOCIAL_LINKS } from "@/shared/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-neutral-200 bg-white">
      <Container className="py-14">
        <p className="text-xl font-extrabold tracking-[0.08em] text-ink">
          TIK TAK
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_1.4fr]">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-ink">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-brand-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold text-ink">Yeniliklərə abunə olun</h3>
            <form className="mt-4 flex max-w-sm overflow-hidden rounded-lg border border-neutral-300">
              <input
                type="email"
                required
                placeholder="E-mail daxil edin"
                className="min-w-0 flex-1 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="shrink-0 bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Göndər
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2024 Azərbaijan Supermarket. Bütün hüquqlar qorunur</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#f5c518] text-[9px] font-bold text-black">
                J
              </span>
              Site by JIS
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="size-4" />
              Azərbaycan
            </span>
          </div>

          <ul className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.id}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-full bg-brand-soft text-brand-dark transition-colors hover:bg-brand hover:text-white"
                >
                  <SocialIcon name={social.id} className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
