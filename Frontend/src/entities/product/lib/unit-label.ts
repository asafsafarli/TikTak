import type { ProductMeasure } from "../model/types";

const UNIT_LABELS: Record<ProductMeasure, string> = {
  kg: "kq",
  gr: "qr",
  litre: "lt",
  ml: "ml",
  meter: "m",
  cm: "sm",
  mm: "mm",
  piece: "əd",
  packet: "paket",
  box: "qutu",
};

export function unitLabel(type: ProductMeasure) {
  return UNIT_LABELS[type];
}
