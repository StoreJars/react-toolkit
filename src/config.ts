
export default {
  GATEWAY_URL: process.env.GATEWAY_URL,
  isClient: process.env.isClient,
  DEFAULT_PP: '/img/user.png',
  TOKEN_STORAGE_KEY: '_cefeIr',
  CART_STORAGE_KEY: 'domain:cart',
  MAX_LOGIN_ATTEMPTS: 5,
  LOCK_TIME: 2 * 60 * 60 * 1000,
};
