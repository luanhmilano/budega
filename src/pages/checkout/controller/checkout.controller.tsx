import { useCart } from '../../../hooks/use-cart';
import Checkout from '../view/checkout.view';

export default function CheckoutController() {
  const { cartItems, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Checkout
      cartItems={cartItems}
      totalPrice={totalPrice}
      clearCart={clearCart}
    />
  );
}
