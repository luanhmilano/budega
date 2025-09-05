import { useCart } from '../../../hooks/use-cart';
import { useProducts } from '../../../hooks/use-products';
import type { Product } from '../../products/types';
import Home from '../view/home.view';

export default function HomeController() {
  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    if (product) {
      addToCart(product, {});
      console.log(`${product.name} foi adicionado ao carrinho!`);
    }
  };

  return (
    <Home
      isLoading={isLoading}
      products={products}
      handleAddToCart={handleAddToCart}
    />
  );
}
