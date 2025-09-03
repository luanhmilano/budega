import type React from "react"
import type { ProductCardProps } from "./types"
import styles from '../../styles/product-card.module.css'
import { formattedPrice } from "../../../../utils/formatted-price"

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart
}) => {
    return (
        <div className={styles.cardContainer}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>{formattedPrice(product)}</p>
            <button 
                className={styles.addToCartButton}
                onClick={() => onAddToCart(product)}
            >
                Adicionar ao Carrinho
            </button>
        </div>
    )
}