export const RoutesUrls = {
    BASE_URL: '/',
    ERRORS: '/errors',
    CART: '/cart',
    PRODUCT: '/product/:id',
} as const;

export type RouteUrl = typeof RoutesUrls[keyof typeof RoutesUrls];