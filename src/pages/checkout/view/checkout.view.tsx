import '../styles/checkout.styles.css';

import { Link } from 'react-router-dom';

import { formattedPrice } from '../../../utils/formatted-price';
import type { CheckoutProps } from '../types';

export default function Checkout({
  cartItems,
  totalPrice,
  clearCart,
}: Readonly<CheckoutProps>) {
  console.log('Finalizando compra com os itens:', cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="container checkoutContainer">
        <div className="emptyCheckout">
          <h2>Nenhum item para finalizar</h2>
          <p>Adicione produtos ao carrinho para continuar com a compra.</p>
          <Link to="/" className="btn btn-primary" onClick={clearCart}>
            Voltar às Compras
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkoutContainer">
      <div className="checkoutLayout">
        <div className="checkoutMain">
          <h1 className="checkoutTitle">Finalizar Compra</h1>

          <div className="card successMessage">
            <h2>Obrigado pela sua compra!</h2>
            <p>Esta é a página final da jornada do MVP.</p>
            <p>
              Verifique o console para ver os itens que seriam enviados para o
              backend.
            </p>
          </div>

          <div className="checkoutActions">
            <Link to="/" className="btn btn-primary" onClick={clearCart}>
              Continuar Comprando
            </Link>
          </div>
        </div>

        <div className="orderSummary">
          <h2 className="summaryTitle">Resumo do Pedido</h2>

          <div className="orderItems">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="orderItem">
                <img
                  src={item.image}
                  alt={item.name}
                  className="orderItemImage"
                />
                <div className="orderItemDetails">
                  <h3 className="orderItemName">{item.name}</h3>
                  {Object.entries(item.selectedVariants).map(
                    ([name, value]) => (
                      <p key={name} className="orderItemVariant">
                        {name}: {value}
                      </p>
                    ),
                  )}
                  <p className="orderItemQuantity">
                    Quantidade: {item.quantity}
                  </p>
                </div>
                <p className="orderItemPrice price">
                  {formattedPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="orderTotals">
            <div className="orderTotalRow">
              <span>
                Subtotal ({cartItems.length}{' '}
                {cartItems.length === 1 ? 'item' : 'itens'})
              </span>
              <span>{formattedPrice(totalPrice)}</span>
            </div>
            <div className="orderTotalRow">
              <span>Entrega</span>
              <span>Grátis</span>
            </div>
            <div className="orderTotalRow orderTotalFinal">
              <span>Total</span>
              <span>{formattedPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
