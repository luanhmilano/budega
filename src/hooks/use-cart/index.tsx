import { useContext } from 'react';

import { CartContext } from '../../context/cart-context';
import type { CartContextType } from '../../pages/cart/types';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }

  return context;
};
