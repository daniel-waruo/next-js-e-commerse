import {ADD_TO_CART_URL, REMOVE_FROM_CART_URL, UPDATE_CART} from "../_constants";
import {request} from '../_request';

export default {
  addToCart: async (obj, args, {cache}, info) => {
    // initialize success as false
    let success = false;
    const data = {
      product_pk: parseInt(args.productID),
      product_number: args.productNumber
    };
    // send a login request to the server
    await request.post({
      url: ADD_TO_CART_URL, // registration url
      data: data, // data to be sent to the server
      success: data => {
        // set success as true
        success = true;
      },// if the request was successful call the function
      error: error => {
        // write the registration errors on the cache
        console.error(error)
      }
    });
    // return null
    return success;
  },
  removeFromCart: async (obj, args, {cache}, info) => {
    // initialize success as false
    let success = false;
    const data = {
      product_pk: parseInt(args.productID)
    };
    // send a login request to the server
    await request.post({
      url: REMOVE_FROM_CART_URL, // registration url
      data: data, // data to be sent to the server
      success: data => {
        // set success as true
        success = true;
      },// if the request was successful call the function
      error: error => {
        // write the registration errors on the cache
        console.error(error)
      }
    });
    // return null
    return success;
  },
  updateCart: async (obj, args, {cache}, info) => {
    // initialize success as false
    let success = false;
    const data = {
      products: args.products
    };
    // send a login request to the server
    await request.post({
      url: UPDATE_CART, // registration url
      data: data, // data to be sent to the server
      success: data => {
        // set success as true
        success = true;
      },// if the request was successful call the function
      error: error => {
        // write the registration errors on the cache
        console.error(error)
      }
    });
    // return null
    return success;
  }
}