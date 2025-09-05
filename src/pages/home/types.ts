import type { Product } from '../products/types';

export interface HomeProps {
  isLoading: boolean;
  products: Product[];
  handleAddToCart: (product: Product) => void;
}
