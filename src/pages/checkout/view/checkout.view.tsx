import { useCart } from "../../../hooks/use-cart";

export default function Checkout() {
    const { cartItems } = useCart();

    console.log("Finalizando compra com os itens:", cartItems);

    return (
        <div>
            <h1>Finalizar Compra</h1>
            <p>Obrigado pela sua compra!</p>
            <p>Esta é a página final da jornada do MVP.</p>
            <p>Verifique o console para ver os itens que seriam enviados para o backend.</p>
        </div>
    );
}