import { RoutesUrls } from '@utils/enums/routes-url';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CartController from '@/pages/cart/index.page';
import CheckoutController from '@/pages/checkout/index.page';
import HomeController from '@/pages/home/index.page';
import ProductsController from '@/pages/products/index.page';

export function RouterProvider() {
  const routes = [
    {
      path: RoutesUrls.BASE_URL,
      element: <HomeController />,
    },
    {
      path: RoutesUrls.CHECKOUT,
      element: <CheckoutController />,
    },
    {
      path: RoutesUrls.CART,
      element: <CartController />,
    },
    {
      path: RoutesUrls.PRODUCT,
      element: <ProductsController />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
