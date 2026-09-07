# TikTak Admin API

Mənbə: paylaşılan Postman kolleksiyası (`Tiktak | E-commerce Api's | Stage 3-4 Final`), yalnız **Admin** qovluğu.

## Base URL

```
https://api.sarkhanrahimli.dev/api/tiktak
```

Kod daxilində `Admin/src/shared/config/env.ts` və `VITE_API_BASE_URL` mühit dəyişəni ilə idarə olunur (bax `.env.example`).

## Auth

Login xaric bütün sorğular `Authorization: Bearer <access_token>` header-i tələb edir.

```
Content-Type: application/json
Authorization: Bearer <access_token>
```

Token-lər `localStorage`-da saxlanılır (`shared/lib/token-storage.ts`). Hazırda **refresh token axını implement edilməyib** — access token bitəndə istifadəçi yenidən login olmalıdır (refresh endpoint client tərəfdə mövcuddur: `POST /auth/refresh`, amma admin panelə hələ bağlanmayıb).

---

## Auth

### `POST /auth/admin/login`

Auth tələb etmir.

**Body**
```json
{ "phone": "+994105554422", "password": "Admin1234" }
```

**Cavab (200)**
```json
{
  "message": "Ok",
  "data": {
    "tokens": { "access_token": "...", "refresh_token": "..." },
    "profile": {
      "id": 2,
      "full_name": "Tiktak Admin",
      "phone": "+994105554422",
      "address": null,
      "img_url": null,
      "role": "ADMIN",
      "created_at": "2025-06-12T05:44:27.813Z"
    }
  },
  "result": true
}
```

Səhv olarsa: `{ "statusCode": 401, "message": "Password is wrong!", "result": false }`

---

## Profile

### `GET /admin/profile`

Login sonrası sessiyanı doğrulamaq üçün istifadə olunur (səhifə yenilənəndə tokenlə profil çəkilir).

**Cavab (200)** — login-dəki `profile` obyektinin eynisi.

---

## Users

### `GET /admin/users`

**Cavab (200)**
```json
{
  "message": "Ok",
  "data": [
    {
      "id": 3,
      "full_name": "John Doe",
      "phone": "+994516667766",
      "address": null,
      "img_url": null,
      "role": "COMMERCE",
      "created_at": "2025-06-12T05:47:24.588Z"
    }
  ],
  "result": true
}
```

> Qeyd: nümunə cavabda `password` (hash) sahəsi də var idi — frontend-də istifadə edilmir/render olunmamalıdır.

---

## Categories

CRUD (Products bölməsi üçün `category_id` seçimində istifadə olunur).

| Əməliyyat | Endpoint |
|---|---|
| Siyahı | `GET /admin/categories` |
| Yarat | `POST /admin/category` |
| Redaktə | `PUT /admin/categories/:id` |
| Sil | `DELETE /admin/categories/:id` |

**Create/Update body**
```json
{ "name": "Category-1", "description": "Lorem", "img_url": "" }
```
`img_url` optional-dır.

**Model**
```ts
interface Category {
  id: number
  name: string
  img_url: string | null
  description: string | null
  created_at: string
}
```

---

## Products

| Əməliyyat | Endpoint |
|---|---|
| Siyahı | `GET /admin/products?limit=&page=&search=` |
| Yarat | `POST /admin/product` |
| Redaktə | `PUT /admin/products/:id` |
| Sil | `DELETE /admin/products/:id` |

**Create/Update body**
```json
{
  "title": "Producty-3 Icki",
  "description": "Lorem ipsum",
  "price": "8.90",
  "type": "litre",
  "img_url": "",
  "category_id": 1
}
```

`type` — `ProductMeasure` enum: `kg | gr | litre | ml | meter | cm | mm | piece | packet | box`.

**List cavabı** `pagination` obyekti ilə gəlir:
```json
{
  "message": "Ok",
  "data": [ /* Product[] */ ],
  "pagination": { "next": null, "prev": null, "current": 1, "total": 2, "totalPages": 1 },
  "result": true
}
```

---

## Campaigns

Category ilə eyni CRUD forması.

| Əməliyyat | Endpoint |
|---|---|
| Siyahı | `GET /admin/campaigns` |
| Yarat | `POST /admin/campaign` |
| Redaktə | `PUT /admin/campaigns/:id` |
| Sil | `DELETE /admin/campaigns/:id` |

**Create/Update body**
```json
{ "title": "Campaign-1", "description": "Lorem", "img_url": "" }
```

---

## Orders

| Əməliyyat | Endpoint |
|---|---|
| Siyahı | `GET /orders/admin` |
| Status dəyiş | `PUT /orders/admin/:id/status` |

**Status body**
```json
{ "status": "PREPARING" }
```
`OrderStatus` enum: `PENDING | CONFIRMED | PREPARING | READY | DELIVERED | CANCELLED`.

**Order modeli** (`list` cavabındakı hər element):
```ts
interface Order {
  id: number
  orderNumber: string
  total: string
  deliveryFee: string
  paymentMethod: 'CARD' | 'CASH'
  status: OrderStatus
  note: string | null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
  user: { id: number; full_name: string; img_url: string | null }
  items: Array<{ id: number; quantity: number; total_price: string; product: Product }>
}
```

### ⚠️ Statistika (TOTAL/PENDING/PREPARING/DELIVERED/TOTAL_REVENUE)

Postman kolleksiyasında "stats" nümunəsi **eyni `GET /orders/admin` endpoint-inə** göndərilib, amma cavabı fərqlidir (sifariş siyahısı yerinə `{TOTAL, PENDING, ...}` obyekti). Bu, real ayrıca bir path-ın (məs. `/orders/admin/stats`) sənədləşdirmə zamanı səhv qeyd olunması kimi görünür və dəqiqləşdirilə bilmədi.

**Qərar:** ayrıca stats endpoint-inə etibar etmirik. Bunun əvəzinə `GET /orders/admin`-dən gələn tam sifariş siyahısından statistikanı **client tərəfdə** hesablayırıq: `entities/order/lib/compute-stats.ts` → `computeOrderStats(orders)`.

Əgər backend-də əslində ayrıca bir stats endpoint varsa (path dəqiqləşəndə), bu funksiyanı asanlıqla real API çağırışı ilə əvəz edə bilərik.

### Sifarişlər səhifəsi (implement olunub)

`pages/orders` → `widgets/orders-list` → `OrdersList`:

- **6 statistika kartı** (`computeOrderStats`): Ümumi sifarişlər (`total`), Ümumi satış
  (`totalRevenue`), Gözləyən (`PENDING`), Hazırlanır (`PREPARING`), Çatdırılan
  (`DELIVERED`), Ləğv edilən (`CANCELLED`).
- **Cədvəl** sütunları: No (`orderNumber`), Tarix (`createdAt`, `dd-mm`), Çatdırılma
  ünvanı (`address`), Məhsul sayı (`items` üzrə `quantity` cəmi), Subtotal/Çatdırılma
  (`total − deliveryFee` + `deliveryFee===0 ? "Pulsuz"`), Status badge, Əməliyyat.
- Hər sütunda client-side **sıralama** (chevron) və **filtr** (funnel: mətn axtarışı;
  Status üçün çoxseçimli). Topbar axtarışı `orderNumber` / `address` / müştəri adına baxır.
- **Səhifələmə** page-size seçicisi ilə (5/10/20/50).
- "Göstər" → `features/orders/detail` `OrderDetailDialog`: məhsullar, ünvan, telefon,
  qeyd, ödəniş, cəmlər + `PUT /orders/admin/:id/status` ilə status dəyişmə.
- Status etiketləri/rəngləri: `entities/order/model/status.ts` → `ORDER_STATUS_META`.

---

## Upload

### `POST /upload`

`multipart/form-data`, sahə adı: `file`.

**Cavab (201)**
```json
{ "message": "File uploaded successfully", "data": { "url": "https://..." }, "result": true }
```

Qayıdan `url` — Product/Category/Campaign formalarında `img_url` sahəsinə yazılır.

---

## Kod tərəfində qarşılıq

| API resurs | FSD entity | Fayl |
|---|---|---|
| Auth/Profile | `entities/session` | `src/entities/session` |
| Users | `entities/user` | `src/entities/user` |
| Categories | `entities/category` | `src/entities/category` |
| Products | `entities/product` | `src/entities/product` |
| Campaigns | `entities/campaign` | `src/entities/campaign` |
| Orders | `entities/order` | `src/entities/order` |
| Upload | — | `src/shared/api/upload.ts` |

Hər entity-nin `api/` qovluğunda iki fayl olur: xam `fetch` funksiyaları (`*.ts`) və React Query hook-ları (`queries.ts`) — keşləmə, təkrar sorğuların qarşısını almaq və mutation-dan sonra avtomatik yeniləmə üçün.
