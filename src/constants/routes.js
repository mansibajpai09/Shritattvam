export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  COLLECTION: '/collection',
  PRODUCT: (id) => `/product/${id}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  ORDER_TRACKING: '/order-tracking',
  PLACE_ORDER: '/place-order',
  POLICIES: {
    DISCLAIMER: '/disclaimer',
EXCHANGE_POLICY: '/exchange-policy',
TERMS: '/terms-and-conditions',
PRIVACY: '/privacy-policy',
  },
}

export const POLICY_PAGES = [
  {
    path: ROUTES.POLICIES.DISCLAIMER,
    title: 'Disclaimer',
    slug: 'disclaimer',
  },
  {
    path: ROUTES.POLICIES.EXCHANGE,
    title: 'Exchange Policy',
    slug: 'exchange',
  },
  {
    path: ROUTES.POLICIES.TERMS,
    title: 'Terms & Conditions',
    slug: 'terms',
  },
  {
    path: ROUTES.POLICIES.PRIVACY,
    title: 'Privacy Policy',
    slug: 'privacy',
  },
  {
    path: ROUTES.POLICIES.SHIPPING,
    title: 'Shipping Policy',
    slug: 'shipping',
  },
  {
    path: ROUTES.POLICIES.RETURNS,
    title: 'Return & Refund Policy',
    slug: 'returns',
  },
  {
    path: ROUTES.POLICIES.CANCELLATION,
    title: 'Cancellation Policy',
    slug: 'cancellation',
  },
]
