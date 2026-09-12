import type { Metadata } from "next";
import { ProductDetailPage } from "@/views/product-detail";

export const metadata: Metadata = {
  title: "Məhsul — TIK TAK",
};

export default async function Page({ params }: PageProps<"/product/[id]">) {
  const { id } = await params;
  return <ProductDetailPage productId={Number(id)} />;
}
