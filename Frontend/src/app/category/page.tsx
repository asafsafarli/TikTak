import type { Metadata } from "next";
import { CategoryPage } from "@/views/category";

export const metadata: Metadata = {
  title: "Kateqoriyalar — TIK TAK",
};

export default function Page() {
  return <CategoryPage />;
}
