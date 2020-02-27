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