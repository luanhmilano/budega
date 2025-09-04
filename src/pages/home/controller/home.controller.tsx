import Home from "../view/home.view";
import { useEffect, useState } from "react";
import type { Product } from "../../products/types";
import { getProducts } from "../../../services/product-service";

export default function HomeController() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Hook de fetch de produtos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await getProducts();
                setProducts(productList);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        // Implementar
        console.log("Produto adicionado ao carrinho:", product.name);
    }

    return (
        <Home 
            isLoading={isLoading}
            products={products}
            handleAddToCart={handleAddToCart}
        />
    )
}