import '../styles/products.styles.css';

import { Link } from 'react-router-dom';

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
  if (isLoading) return <div className="loading">A carregar...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return null;

  return (
    <div className="pageContainer">
      <div className="productLayout">
        <img src={product.image} alt={product.name} className="productImage" />
        <div className="productDetails">
          <h1 className="productName">{product.name}</h1>
          <p className="productPrice">{productPriceFormatted}</p>
          <p className="productDescription">{product.description}</p>

          {product.variants && (
            <div className="variantsSection">
              {product.variants.map((variant) => (
                <div key={variant.name} className="variantGroup">
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
          <div className="buttonGroup">
            <button onClick={handleAddToCart} className="btn btn-accent">
              Adicionar ao Carrinho
            </button>
            <Link to="/cart" className="btn btn-secondary">
              Ver o carrinho
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
