import '../../styles/product-card.styles.css';

import type React from 'react';
import { Link } from 'react-router-dom';

import { formattedPrice } from '../../../../utils/formatted-price';
import type { ProductCardProps } from './types';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="card cardContainer">
      <img src={product.image} alt={product.name} className="productImage" />
      <h3 className="productName">{product.name}</h3>
      <p className="productDescription">{product.description}</p>
      <p className="productPrice price price-medium">
        {formattedPrice(product.price)}
      </p>
      <div className="buttonGroup">
        <Link
          to={`/product/${product.id}`}
          className="btn btn-secondary viewProductButton"
        >
          Ver Produto
        </Link>
        <button
          className="btn btn-accent addToCartButton"
          onClick={() => onAddToCart(product)}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};
