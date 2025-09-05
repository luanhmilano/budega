export const RoutesUrls = {
    BASE_URL: '/',
    CHECKOUT: '/checkout',
    CART: '/cart',
    PRODUCT: '/product/:id',
} as const;

export type RouteUrl = typeof RoutesUrls[keyof typeof RoutesUrls];