import type { CartContextType } from '@src/pages/cart/types';
import { renderHook } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CartProvider } from '../../../../src/context/cart-context';
import { useCart } from '../../../../src/hooks/use-cart';

vi.mock('../../../../src/hooks/use-local-storage', () => ({
  useLocalStorage: vi.fn(),
}));

describe('useCart Hook', () => {
  beforeEach(async () => {
    const mockSetCartItems = vi.fn();
    const mockCartItems: never[] = [];

    const { useLocalStorage } = await import(
      '../../../../src/hooks/use-local-storage'
    );
    vi.mocked(useLocalStorage).mockReturnValue([
      mockCartItems,
      mockSetCartItems,
    ]);
  });

  describe('main behavior', () => {
    it('it should render context correctly in a CartProvider', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      expect(result.current).toBeDefined();
      expect(typeof result.current).toBe('object');
    });

    it('should return all the context properties', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      const expectedProperties: (keyof CartContextType)[] = [
        'cartItems',
        'addToCart',
        'removeFromCart',
        'updateQuantity',
        'clearCart',
      ];

      expectedProperties.forEach((property) => {
        expect(result.current).toHaveProperty(property);
      });
    });

    it('should return functions for cart operations', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      expect(typeof result.current.addToCart).toBe('function');
      expect(typeof result.current.removeFromCart).toBe('function');
      expect(typeof result.current.updateQuantity).toBe('function');
      expect(typeof result.current.clearCart).toBe('function');
    });

    it('should return array for CartItems', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      expect(Array.isArray(result.current.cartItems)).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should throw an error when used outside of CartProvider.', () => {
      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart deve ser usado dentro de um CartProvider');
    });

    it('should throw an error with a specific message in Portuguese.', () => {
      const expectedErrorMessage =
        'useCart deve ser usado dentro de um CartProvider';

      expect(() => {
        renderHook(() => useCart());
      }).toThrow(expectedErrorMessage);
    });

    it('should throw an error whent context is undefined', () => {
      expect(() => {
        renderHook(() => useCart());
      }).toThrowError(Error);
    });
  });

  describe('Context integration', () => {
    it('should return the same context object on multiple calls', () => {
      const TestWrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider>{children}</CartProvider>
      );

      const { result: result1 } = renderHook(() => useCart(), {
        wrapper: TestWrapper,
      });

      const { result: result2 } = renderHook(() => useCart(), {
        wrapper: TestWrapper,
      });

      expect(Object.keys(result1.current)).toEqual(
        Object.keys(result2.current),
      );
    });
  });

  describe('Hook behavior', () => {
    it('should be reusable across different components', () => {
      function ComponenteA() {
        const cart = useCart();
        return cart.cartItems.length;
      }

      function ComponenteB() {
        const cart = useCart();
        return cart.cartItems.length;
      }

      const WrapperComponent = ({
        children,
      }: {
        children: React.ReactNode;
      }) => (
        <CartProvider>
          <ComponenteA />
          <ComponenteB />
          {children}
        </CartProvider>
      );

      expect(() => {
        renderHook(() => useCart(), {
          wrapper: WrapperComponent,
        });
      }).not.toThrow();
    });

    it('should work with nested components', () => {
      const MiddleComponent = ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      );

      const WrapperWithNesting = ({
        children,
      }: {
        children: React.ReactNode;
      }) => (
        <CartProvider>
          <MiddleComponent>
            <div>
              <span>{children}</span>
            </div>
          </MiddleComponent>
        </CartProvider>
      );

      const { result } = renderHook(() => useCart(), {
        wrapper: WrapperWithNesting,
      });

      expect(result.current).toBeDefined();
      expect(typeof result.current.addToCart).toBe('function');
    });
  });

  describe('Edge cases', () => {
    it('should work even when CartProvider is re-rendered', () => {
      let providerKey = 0;

      const DynamicWrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider key={providerKey}>{children}</CartProvider>
      );

      const { result, rerender } = renderHook(() => useCart(), {
        wrapper: DynamicWrapper,
      });

      expect(result.current).toBeDefined();

      providerKey++;
      rerender();

      expect(result.current).toBeDefined();
      expect(typeof result.current.addToCart).toBe('function');
    });

    it('should maintain functionality after multiple re-renders', () => {
      const { result, rerender } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      const initialCartItems = result.current.cartItems;

      for (let i = 0; i < 5; i++) {
        rerender();
        expect(result.current).toBeDefined();
        expect(Array.isArray(result.current.cartItems)).toBe(true);
      }

      expect(result.current.cartItems).toBe(initialCartItems);
    });
  });
});
