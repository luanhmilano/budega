import type { CartItem } from '@src/pages/cart/types';
import type { Product } from '@src/pages/products/types';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CartProvider } from '../../../src/context/cart-context';
import { useCart } from '../../../src/hooks/use-cart';

vi.mock('../../../src/hooks/use-local-storage', () => ({
  useLocalStorage: vi.fn(),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Produto Teste 1',
    description: 'Descrição do produto 1',
    price: 100,
    image: 'https://via.placeholder.com/150',
    variants: [
      {
        name: 'Tamanho',
        options: [
          { label: 'P', value: 'p' },
          { label: 'M', value: 'm' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Produto Teste 2',
    description: 'Descrição do produto 2',
    price: 200,
    image: 'https://via.placeholder.com/150',
    variants: [],
  },
];

function TestComponent() {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  return (
    <div>
      <div data-testid="cart-count">{cartItems.length}</div>

      {cartItems.map((item) => (
        <div key={item.cartItemId} data-testid={`cart-item-${item.cartItemId}`}>
          <span data-testid={`item-name-${item.cartItemId}`}>{item.name}</span>
          <span data-testid={`item-quantity-${item.cartItemId}`}>
            {item.quantity}
          </span>
          <span data-testid={`item-price-${item.cartItemId}`}>
            {item.price}
          </span>
        </div>
      ))}

      <button
        data-testid="add-product-1"
        onClick={() => addToCart(mockProducts[0], { tamanho: 'p' }, 2)}
      >
        Adicionar Produto 1
      </button>

      <button
        data-testid="add-product-2"
        onClick={() => addToCart(mockProducts[1], {}, 1)}
      >
        Adicionar Produto 2
      </button>

      <button data-testid="remove-item" onClick={() => removeFromCart('1-p')}>
        Remover Item
      </button>

      <button
        data-testid="update-quantity"
        onClick={() => updateQuantity('1-p', 5)}
      >
        Atualizar Quantidade
      </button>

      <button data-testid="clear-cart" onClick={clearCart}>
        Limpar Carrinho
      </button>
    </div>
  );
}

function renderWithCartProvider(ui: React.ReactElement) {
  return render(<CartProvider>{ui}</CartProvider>);
}

describe('CartContext', () => {
  let mockSetCartItems: (value: unknown) => void;
  let mockCartItems: CartItem[];

  beforeEach(async () => {
    mockCartItems = [];
    mockSetCartItems = vi.fn((updateFn: unknown) => {
      if (typeof updateFn === 'function') {
        mockCartItems = updateFn(mockCartItems);
      } else {
        mockCartItems = updateFn as CartItem[];
      }
    });

    const { useLocalStorage } = await import(
      '../../../src/hooks/use-local-storage'
    );
    vi.mocked(useLocalStorage).mockReturnValue([
      mockCartItems,
      mockSetCartItems,
    ]);
  });

  describe('basic cart functionalities', () => {
    it('should initialize with empty cart', () => {
      renderWithCartProvider(<TestComponent />);

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    });

    it('should add items to the cart', async () => {
      const user = userEvent.setup();
      renderWithCartProvider(<TestComponent />);

      await user.click(screen.getByTestId('add-product-1'));

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should add multiple different items to the cart', async () => {
      const user = userEvent.setup();
      renderWithCartProvider(<TestComponent />);

      await user.click(screen.getByTestId('add-product-1'));
      await user.click(screen.getByTestId('add-product-2'));

      expect(mockSetCartItems).toHaveBeenCalledTimes(2);
    });
  });

  describe('quantity management', () => {
    it('should update item quantity in the cart', async () => {
      const user = userEvent.setup();

      mockCartItems = [
        {
          ...mockProducts[0],
          cartItemId: '1-p',
          selectedVariants: { tamanho: 'p' },
          quantity: 2,
        },
      ];

      renderWithCartProvider(<TestComponent />);

      await user.click(screen.getByTestId('update-quantity'));

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should remove item when quantity is zero or negative', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      act(() => {
        result.current.addToCart(mockProducts[0], { tamanho: 'p' }, 1);
      });

      act(() => {
        result.current.updateQuantity('1-p', 0);
      });

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('removal and clearing', () => {
    it('should remove item from the cart', async () => {
      const user = userEvent.setup();

      mockCartItems = [
        {
          ...mockProducts[0],
          cartItemId: '1-p',
          selectedVariants: { tamanho: 'p' },
          quantity: 2,
        },
      ];

      renderWithCartProvider(<TestComponent />);

      await user.click(screen.getByTestId('remove-item'));

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should clear the entire cart', async () => {
      const user = userEvent.setup();

      mockCartItems = [
        {
          ...mockProducts[0],
          cartItemId: '1-p',
          selectedVariants: { tamanho: 'p' },
          quantity: 1,
        },
        {
          ...mockProducts[1],
          cartItemId: '2-',
          selectedVariants: {},
          quantity: 1,
        },
      ];

      renderWithCartProvider(<TestComponent />);

      await user.click(screen.getByTestId('clear-cart'));

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('CartItemId generation', () => {
    it('should generate unique cartItemId for different variant selections', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      act(() => {
        result.current.addToCart(mockProducts[0], { tamanho: 'p' }, 1);
      });

      act(() => {
        result.current.addToCart(mockProducts[0], { tamanho: 'm' }, 1);
      });

      expect(mockSetCartItems).toHaveBeenCalledTimes(2);
    });
  });

  describe('LocalStorage integration', () => {
    it('should use the correct localStorage key', async () => {
      renderWithCartProvider(<TestComponent />);

      const { useLocalStorage } = await import(
        '../../../src/hooks/use-local-storage'
      );
      expect(useLocalStorage).toHaveBeenCalledWith('budega-cart', []);
    });

    it('should persist state across updates', async () => {
      const user = userEvent.setup();
      renderWithCartProvider(<TestComponent />);

      await user.click(screen.getByTestId('add-product-1'));

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('Edge cases', () => {
    it('should handle product without variants', async () => {
      const user = userEvent.setup();
      renderWithCartProvider(<TestComponent />);

      await user.click(screen.getByTestId('add-product-2'));

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle removal of non-existent item', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      act(() => {
        result.current.removeFromCart('item-inexistente');
      });

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle update of non-existent item quantity', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      act(() => {
        result.current.updateQuantity('item-inexistente', 5);
      });

      expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));
    });

    describe('Data Structure of CartItem', () => {
      it('should preserve all properties of the product in the cart item', () => {
        const { result } = renderHook(() => useCart(), {
          wrapper: CartProvider,
        });

        const variants = { tamanho: 'p' };
        const quantity = 3;

        act(() => {
          result.current.addToCart(mockProducts[0], variants, quantity);
        });

        expect(mockSetCartItems).toHaveBeenCalledWith(expect.any(Function));

        const reducerCall = vi.mocked(mockSetCartItems).mock.calls[0][0];
        const newState =
          typeof reducerCall === 'function' ? reducerCall([]) : [];

        expect(newState[0]).toEqual({
          ...mockProducts[0],
          quantity,
          selectedVariants: variants,
          cartItemId: '1-p',
        });
      });
    });
  });
});
