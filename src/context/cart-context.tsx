import React, { createContext, useReducer } from 'react';

import type { CartContextType, CartItem } from '../pages/cart/types';
import type { Product } from '../pages/products/types';

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

interface CartProviderProps {
  children: React.ReactNode;
}

type CartAction =
  | {
      type: 'ADD_ITEM';
      payload: {
        product: Product;
        selectedVariants: { [key: string]: string };
        quantity: number;
      };
    }
  | { type: 'REMOVE_ITEM'; payload: { cartItemId: string } }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { cartItemId: string; newQuantity: number };
    }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, selectedVariants, quantity } = action.payload;
      const cartItemId = `${product.id}-${Object.values(selectedVariants).sort().join('-')}`;

      const existingItem = state.find((item) => item.cartItemId === cartItemId);

      if (existingItem) {
        return state.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        const newItem: CartItem = {
          ...product,
          quantity,
          selectedVariants,
          cartItemId,
        };
        return [...state, newItem];
      }
    }
    case 'REMOVE_ITEM': {
      return state.filter(
        (item) => item.cartItemId !== action.payload.cartItemId,
      );
    }
    case 'UPDATE_QUANTITY': {
      const { cartItemId, newQuantity } = action.payload;
      if (newQuantity <= 0) {
        return state.filter((item) => item.cartItemId !== cartItemId);
      }
      return state.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item,
      );
    }
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (
    product: Product,
    selectedVariants: { [key: string]: string },
    quantity: number = 1,
  ) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, selectedVariants, quantity },
    });
  };

  const removeFromCart = (cartItemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { cartItemId } });
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartItemId, newQuantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const contextValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
