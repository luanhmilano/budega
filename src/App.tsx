import './App.css';

import { CartProvider } from './context/cart-context';
import { RouterProvider } from './routes';

function App() {
  return (
    <CartProvider>
      <RouterProvider />
    </CartProvider>
  );
}

export default App;
