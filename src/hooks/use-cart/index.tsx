import { useContext } from "react";
import type { CartContextType } from "../../pages/cart/types";
import { CartContext } from "../../context/cart-context";

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart deve ser usado dentro de um CartProvider');
    }

    return context;
}