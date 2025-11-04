import '../styles/home.styles.css';

import { Link } from 'react-router-dom';

import { ProductCard } from '../../products/components/product-card';
import type { HomeProps } from '../types';

export default function Home({
  isLoading,
  products,
  handleAddToCart,
}: Readonly<HomeProps>) {
  if (isLoading) {
    return <div className="loading">A carregar produtos...</div>;
  }

  return (
    <div className="homeContainer">
      <div className="header">
        <h1>Nossos Produtos</h1>
        <Link to="/cart" className="btn btn-accent">
          Ver o carrinho
        </Link>
      </div>
      <div className="productGrid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
