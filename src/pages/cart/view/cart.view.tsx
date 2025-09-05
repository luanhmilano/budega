import { Link } from 'react-router-dom';

import { formattedPrice } from '../../../utils/formatted-price';
import styles from '../styles/cart.view.module.css';
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
      <div className={styles.emptyCart}>
        <h2>O seu carrinho está vazio.</h2>
        <Link to="/" className={styles.continueShopping}>
          Continuar a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1>Meu Carrinho</h1>
      <div className={styles.cartGrid}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.cartItemId} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                {Object.entries(item.selectedVariants).map(([name, value]) => (
                  <p key={name} className={styles.itemVariant}>
                    {name}: {value}
                  </p>
                ))}
                <p className={styles.itemPrice}>{formattedPrice(item.price)}</p>
              </div>
              <div className={styles.itemActions}>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.cartItemId,
                      parseInt(e.target.value, 10),
                    )
                  }
                  className={styles.quantityInput}
                />
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className={styles.removeButton}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2>Resumo do Pedido</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formattedTotalPrice}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Entrega</span>
            <span>A calcular</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>{formattedTotalPrice}</span>
          </div>
          <Link to="/checkout" className={styles.checkoutButton}>
            Finalizar Compra
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className={styles.removeButton}
          >
            Esvaziar Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
