import type { Product } from "../../types";

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}