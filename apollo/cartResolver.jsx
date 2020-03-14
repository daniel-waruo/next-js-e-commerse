import {ADD_TO_CART_URL, REMOVE_FROM_CART_URL, UPDATE_CART} from "../_constants";
import {request} from '../_request';

export default {
  addToCart: async (obj, args, {cache}, info) => {
    // initialize success as false
    let success = false ;
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
    // send a request to the server to update the products
    await request.post({
      url: UPDATE_CART, // update cart URL's
      data: data, // data to be sent to the server
      success: data => {
        // set success as true
        success = true;
      },// if the request was successful call the function
      error: error => {
        // console log the errors on the console for error handling analysis
        console.error(error)
      }
    });
    // return null
    return success;
  },
  showCartDialog: (obj, args, {cache}, info) => {
    // change apollo cache state to show the show the product dialog
    cache.writeData({
      data: {
        cartDialog: {
          __typename: 'CartDialog',
          visible: true,
          status: args.status,
          productName: args.productName
        }
      }
    });
    return null;
  },
  removeCartDialog: (obj, args, {cache}, info) => {
    // change apollo cache state to remove the product Dialog
    cache.writeData({
      data: {
        cartDialog: {
          __typename: 'CartDialog',
          visible: false,
          productID: null,
          productName: null
        }
      }
    });
    return null;
  }
}