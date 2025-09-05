import { Link } from 'react-router-dom';

import styles from '../styles/product.view.module.css';
import type { ProductsProps } from '../types';

export default function Products({
  isLoading,
  error,
  product,
  productPriceFormatted,
  selectedVariants,
  handleVariantChange,
  handleAddToCart,
}: Readonly<ProductsProps>) {
  if (isLoading) return <div className={styles.loading}>A carregar...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return null;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.productLayout}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        <div className={styles.productDetails}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>{productPriceFormatted}</p>
          <p className={styles.productDescription}>{product.description}</p>

          {product.variants && (
            <div className={styles.variantsSection}>
              {product.variants.map((variant) => (
                <div key={variant.name} className={styles.variantGroup}>
                  <label htmlFor={variant.name}>{variant.name}</label>
                  <select
                    id={variant.name}
                    value={selectedVariants[variant.name] || ''}
                    onChange={(e) =>
                      handleVariantChange(variant.name, e.target.value)
                    }
                  >
                    {variant.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          <div className={styles.buttonGroup}>
            <button
              onClick={handleAddToCart}
              className={styles.addToCartButton}
            >
              Adicionar ao Carrinho
            </button>
            <Link to="/cart" className={styles.viewCartButton}>
              Ver o carrinho
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
