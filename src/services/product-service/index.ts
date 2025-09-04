import { mockProducts } from "../../pages/products/data/produtcs-mock";
import type { Product } from "../../pages/products/types";

export const getProducts = (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 500);
    })
}

export const getProductById = (id: number): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts.find((product) => product.id == id));
        }, 500);
    })
}