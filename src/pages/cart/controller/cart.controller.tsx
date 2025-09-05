import { useMemo } from "react";
import { useCart } from "../../../hooks/use-cart";
import Cart from "../view/cart.view";
import { formattedPrice } from "../../../utils/formatted-price";

export default function CartController() {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    return (
        <Cart 
            cartItems={cartItems}
            formattedTotalPrice={formattedPrice(totalPrice)}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
        />
    )
}