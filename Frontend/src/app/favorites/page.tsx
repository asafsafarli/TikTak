import type { Metadata } from "next";
import { FavoritesPage } from "@/views/favorites";

export const metadata: Metadata = {
  title: "Siyahılarım — TIK TAK",
};

export default function Page() {
  return <FavoritesPage />;
}
