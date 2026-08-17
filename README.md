# TikTak

İki ayrı, müstəqil frontend layihəsindən ibarətdir:

| Qovluq | Stack | Təyinat |
| --- | --- | --- |
| [`Admin/`](./Admin) | Vite + React + TypeScript + Tailwind CSS + shadcn/ui | Admin panel |
| [`Frontend/`](./Frontend) | Next.js (App Router) + TypeScript + Tailwind CSS | Client tərəf (istifadəçi saytı) |

Hər iki layihə **Feature-Sliced Design (FSD)** arxitekturası ilə təşkil olunub və bir-birindən asılı olmayan, ayrı `package.json`-a malik layihələrdir (monorepo tool istifadə olunmur — sadəcə eyni repoda iki qovluq).

## Qovluq strukturu (FSD qatları)

Hər iki layihədə `src/` daxilində eyni qat məntiqi izlənilir, yuxarıdan aşağıya:

```
app/        → tətbiqin kompozisiya kökü (provider-lər, qlobal stillər, routing girişi)
pages|views/→ marşrut səviyyəli səhifələr (widget/feature-ləri birləşdirir)
widgets/    → müstəqil, iri UI blokları (Header, Sidebar, DataTable və s.)
features/   → istifadəçi hərəkətləri (LoginForm, DeleteUser və s.)
entities/   → biznes obyektləri (User, Product, Order və s.)
shared/     → ui (shadcn komponentləri), api, lib, config — layihəyə xas olmayan, hər yerdə istifadə oluna bilən kod
```

Qayda: yuxarı qat aşağı qatdan idxal edə bilər, əksi olmaz (məs. `features` → `entities`/`shared` idxal edə bilər, amma `entities` → `features` idxal edə bilməz).

- **Admin**-da qat `pages/` adlanır (Vite-də marşrutlaşdırma konvensiyası yoxdur, sərbəst adlandırma mümkündür).
- **Frontend**-də bu qat `views/` adlanıb (`pages/` yox), çünki Next.js-in köhnə Pages Router-i məhz `src/pages/` qovluğunu marşrut kimi tanıyır — adı `pages` qoysaydıq, qat daxilindəki `.tsx` fayllar yanlışlıqla ayrıca route kimi görünə bilərdi. `src/app/` yalnız Next.js-in App Router marşrutlaşdırması üçün nazik təbəqə kimi saxlanılıb; faktiki UI `views/`, `widgets/`, `features/` və s. daxilindədir və `app/page.tsx` sadəcə müvafiq view-u render edir.

## İşə salmaq

```bash
# Admin
cd Admin
npm install   # artıq quraşdırılıb
npm run dev   # http://localhost:5173

# Frontend
cd Frontend
npm install   # artıq quraşdırılıb
npm run dev   # http://localhost:3000
```

## Admin-ə UI komponenti əlavə etmək

```bash
cd Admin
npx shadcn@latest add <komponent-adı>
```

Komponentlər `src/shared/ui/` altına düşür (`components.json`-da alias belə tənzimlənib).
