import { useEffect, useState } from 'react';

import type { Product } from '../../pages/products/types';
import { getProductById } from '../../services/product-service';

export const useProductById = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialVariants, setInitialVariants] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError('ID do produto não fornecido.');
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const foundProduct = await getProductById(Number(id));
        if (foundProduct) {
          setProduct(foundProduct);

          const initial: { [key: string]: string } = {};
          foundProduct.variants?.forEach((variant) => {
            initial[variant.name] = variant.options[0].value;
          });
          setInitialVariants(initial);
          setError(null);
        } else {
          setError('Produto não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
        setError('Ocorreu um erro ao carregar o produto.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error, initialVariants };
};
