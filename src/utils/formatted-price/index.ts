import type { Product } from "../../pages/products/types";

export const formattedPrice = (product: Product): string => {
    return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);
}
