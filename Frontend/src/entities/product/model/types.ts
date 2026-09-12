// Admin-dəki `ProductMeasure` enum-un eynisi (bax Frontend/API.md → Products).
export type ProductMeasure =
  | "kg"
  | "gr"
  | "litre"
  | "ml"
  | "meter"
  | "cm"
  | "mm"
  | "piece"
  | "packet"
  | "box";

export interface Product {
  id: number;
  title: string;
  img_url: string | null;
  description: string | null;
  price: string;
  type: ProductMeasure;
  category: { id: number; name: string };
}
