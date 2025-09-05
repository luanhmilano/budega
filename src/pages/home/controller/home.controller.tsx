import Home from "../view/home.view";
import type { Product } from "../../products/types";
import { useProducts } from "../../../hooks/use-products";

export default function HomeController() {
    const { products, isLoading } = useProducts();

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