import type { Product } from '../products/types';

export interface CartItem extends Product {
  quantity: number;
  selectedVariants: { [key: string]: string };
  cartItemId: string;
}

// Definição do contexto do carrinho
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    selectedVariants: { [key: string]: string },
    quantity?: number,
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

export interface CartProps {
  cartItems: CartItem[];
  formattedTotalPrice: string;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
}
