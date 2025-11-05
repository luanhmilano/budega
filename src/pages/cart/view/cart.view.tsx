import '../styles/cart.view.styles.css';

import { Link } from 'react-router-dom';

import { formattedPrice } from '../../../utils/formatted-price';
import type { CartProps } from '../types';

export default function Cart({
  cartItems,
  formattedTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart,
}: Readonly<CartProps>) {
  if (cartItems.length === 0) {
    return (
      <div className="emptyCart">
        <h2>O seu carrinho está vazio.</h2>
        <Link to="/" className="btn btn-primary">
          Continuar a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Meu Carrinho</h1>
      <div className="cartGrid">
        <div className="cartItems">
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="card cartItem">
              <img src={item.image} alt={item.name} className="itemImage" />
              <div className="itemDetails">
                <h3>{item.name}</h3>
                {Object.entries(item.selectedVariants).map(([name, value]) => (
                  <p key={name} className="itemVariant">
                    {name}: {value}
                  </p>
                ))}
                <p className="itemPrice price price-medium">
                  {formattedPrice(item.price)}
                </p>
              </div>
              <div className="itemActions">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.cartItemId,
                      Number.parseInt(e.target.value, 10),
                    )
                  }
                  className="form-input quantityInput"
                />
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="btn btn-danger btn-small"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="card summary">
          <h2>Resumo do Pedido</h2>
          <div className="summaryRow">
            <span>Subtotal</span>
            <span>{formattedTotalPrice}</span>
          </div>
          <div className="summaryRow">
            <span>Entrega</span>
            <span>A calcular</span>
          </div>
          <div className="summaryRow totalRow">
            <span>Total</span>
            <span>{formattedTotalPrice}</span>
          </div>
          <Link to="/checkout" className="btn btn-accent">
            Finalizar Compra
          </Link>
          <button type="button" onClick={clearCart} className="btn btn-danger">
            Esvaziar Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
