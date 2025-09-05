import { Link } from 'react-router-dom';

import { ProductCard } from '../../products/components/product-card';
import styles from '../styles/home.module.css';
import type { HomeProps } from '../types';

export default function Home({
  isLoading,
  products,
  handleAddToCart,
}: Readonly<HomeProps>) {
  if (isLoading) {
    return <p>A carregar produtos...</p>;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Nossos Produtos</h1>
        <Link to="/cart" className={styles.viewCartButton}>
          Ver o carrinho
        </Link>
      </div>
      <div className={styles.productGrid}>
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
