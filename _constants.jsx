export const API_URL = 'http://127.0.0.1:8000';

export const GRAPHQL_ENDPOINT = `${API_URL}/graph-ql`;
/******************************
 * AUTH API ENDPOINTS
 ******************************/
export const LOGIN_URL = `${API_URL}/accounts/auth/login/`;

export const LOGOUT_URL = `${API_URL}/accounts/auth/logout/`;

export const REGISTER_URL = `${API_URL}/accounts/auth/registration/`;

/******************************
 * CART API ENDPOINTS
 ******************************/
export const ADD_TO_CART_URL = `${API_URL}/client/cart/product/add`;

export const REMOVE_FROM_CART_URL = `${API_URL}/client/cart/product/remove`;

export const UPDATE_CART_NUMBER = `${API_URL}/client/cart/product/update_number`;

export const UPDATE_CART = `${API_URL}/client/cart/update`;

/******************************
 * SOCIAL LOGIN CLIENT IDS
 ******************************/

export const CLIENT_IDS = {
  facebook: '1911538922314508',
  instagram: '26a72be8580d41f5adaf8fca106716fd',
  google: '188036970693-7iifjilp8gt7qbmg4ditqc0j6j06uu8q.apps.googleusercontent.com'
};
