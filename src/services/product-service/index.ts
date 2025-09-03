import { mockProducts } from "../../pages/products/data/produtcs-mock";
import type { Product } from "../../pages/products/types";

export function getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 500);
    })
}