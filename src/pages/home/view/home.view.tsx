import styles from '../styles/home.module.css';
import { ProductCard } from "../../products/components/product-card";
import type { HomeProps } from '../types';

export default function Home({
    isLoading,
    products,
    handleAddToCart
}: Readonly<HomeProps>) {
    if (isLoading) {
        return <p>A carregar produtos...</p>;
    } 

    return (
        <div>
            <h1>Nossos Produtos</h1>
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
    )
}