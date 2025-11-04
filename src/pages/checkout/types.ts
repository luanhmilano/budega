import type { CartItem } from '../cart/types';

export interface CheckoutProps {
  cartItems: CartItem[];
  clearCart(): void;
  totalPrice: number;
}
