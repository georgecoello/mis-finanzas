import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL", currencyDisplay: "narrowSymbol" });
export function formatCurrency(value: number) {
  try {
    return currencyFormatter.format(value);
  } catch (e) {
    // fallback
    return `L. ${value.toFixed(2)}`;
  }
}
