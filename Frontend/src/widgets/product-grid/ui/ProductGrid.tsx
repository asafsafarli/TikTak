import type { Product } from "@/entities/product";
import { ProductCard } from "./ProductCard";

// Figma dev-mode: hər kart 187px, `lg`-də (sidebar+səbətlə yanaşı) **tam 4
// sütun şərtdir** — bunun üçün `CategoryDetailPage` geniş `Container`
// (`wide`) istifadə edir ki, 4×187px + araları real sığsın. Sabit sütun sayı
// (auto-fit yox) seçildi ki, say konteyner enindən asılı təsadüfən dəyişməsin.
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
