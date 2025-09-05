import Home from "../view/home.view";
import type { Product } from "../../products/types";
import { useProducts } from "../../../hooks/use-products";
import { useCart } from "../../../hooks/use-cart";

export default function HomeController() {
    const { products, isLoading } = useProducts();
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        if (product) {
            addToCart(product, {});
            console.log(`${product.name} foi adicionado ao carrinho!`)
        }
    }

    return (
        <Home 
            isLoading={isLoading}
            products={products}
            handleAddToCart={handleAddToCart}
        />
    )
}