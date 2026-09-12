import type { Metadata } from "next";
import { CategoryDetailPage } from "@/views/category-detail";

export const metadata: Metadata = {
  title: "Kateqoriya — TIK TAK",
};

export default async function Page({ params }: PageProps<"/category/[id]">) {
  const { id } = await params;
  return <CategoryDetailPage categoryId={Number(id)} />;
}
