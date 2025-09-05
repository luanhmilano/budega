import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from "../view/products.view";
import { formattedPrice } from '../../../utils/formatted-price';
import { useProductById } from '../../../hooks/use-product-by-id';
import { useCart } from '../../../hooks/use-cart';

export default function ProductsController() {
    const { id } = useParams<{ id: string }>();

    const { product, isLoading, error, initialVariants } = useProductById(id);
    const { addToCart } = useCart();

    const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (Object.keys(initialVariants).length > 0) {
            setSelectedVariants(initialVariants);
        }
    }, [initialVariants]);

    const handleVariantChange = (variantName: string, value: string) => {
        setSelectedVariants(prev => ({
            ...prev,
            [variantName]: value,
        }));
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, selectedVariants);
            console.log(`${product.name} foi adicionado ao carrinho!`)
        }
    };

    return ( 
        <Products 
            isLoading={isLoading}
            error={error}
            product={product}
            productPriceFormatted={product ? formattedPrice(product.price) : 'R$ 0,00'}
            selectedVariants={selectedVariants}
            handleVariantChange={handleVariantChange}
            handleAddToCart={handleAddToCart}
        />
    )
}