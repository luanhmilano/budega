import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from "../view/products.view";
import { formattedPrice } from '../../../utils/formatted-price';
import { useProductById } from '../../../hooks/use-product-by-id';

export default function ProductsController() {
    const { id } = useParams<{ id: string }>();

    const { product, isLoading, error, initialVariants } = useProductById(id);

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
        console.log('Adicionando ao carrinho (a implementar):', {
            product,
            selectedVariants,
        });
    };

    return ( 
        <Products 
            isLoading={isLoading}
            error={error}
            product={product}
            productPriceFormatted={product ? formattedPrice(product) : 'R$ 0,00'}
            selectedVariants={selectedVariants}
            handleVariantChange={handleVariantChange}
            handleAddToCart={handleAddToCart}
        />
    )
}