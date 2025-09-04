import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from "../view/products.view";
import type { Product } from '../types';
import { getProductById } from '../../../services/product-service';
import { formattedPrice } from '../../../utils/formatted-price';

export default function ProductsController() {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const foundProduct = await getProductById(Number(id));
                if (foundProduct) {
                    setProduct(foundProduct);
                    const initialVariants: { [key: string]: string} = {};
                    foundProduct.variants?.forEach((variant) => {
                        initialVariants[variant.name] = variant.options[0].value;
                    });
                    setSelectedVariants(initialVariants);
                } else {
                    setError("Produto não encontrado.");
                    // setTimeout(() => navigate('/404'), 3000);
                }
            } catch (error) {
                setError('Ocorreu um erro ao carregar o produto.')
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

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