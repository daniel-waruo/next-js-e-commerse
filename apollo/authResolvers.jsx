import {LOGIN_URL, LOGOUT_URL, REGISTER_URL} from "../_constants";
import {parseError} from "../_helpers";
import {request} from '../_request';

export default {
  login: async (obj, args, {cache}, info) => {
    // send a login request to the server
    await request.post({
      url: LOGIN_URL,
      data: args,
      success: data => {
        // store token in local storage
        // TODO : stop storing token in
        if (typeof localStorage != "undefined")
          localStorage.setItem("token", data.token);

      },
      error: error => {
        // write the error on the cache
        // TODO: Create a Login Type with status and errors on it
        cache.writeData({
          data: {
            loginErrors: parseError(error)
          }
        })
      }
    });
    // return null
    return null;
  },
  logout: async (obj, args, {cache}, info) => {
    // send a logout request to the server
    await request.post({
      url: LOGOUT_URL, // logout url
      success: data => {
        // clear local storage
        if (typeof localStorage != "undefined") {
          localStorage.clear();
          // reload the page
          window.location.reload();
        }
      },
    });
    // return null
    return null;
  },
  register: async (obj, args, {cache}, info) => {
    // initialize success as false
    let success = false;
    // send a login request to the server
    await request.post({
      url: REGISTER_URL, // registration url
      data: args, // data to be sent to the server
      success: data => {
        // set success as true
        success = true;
      },// if the request was successful call the function
      error: error => {
        // write the registration errors on the cache
        cache.writeData({
          data: {
            registerErrors: parseError(error)
          }
        });
      }
    });
    // return null
    return success;
  },
  socialLogin: async (obj, args, {cache}, info) => {

    await request.post({
      url: args.url,
      data: {
        access_token: args.accessToken
      },
      success: data => {
        // store token in local storage
        // FIXME : stop using localStorage to store tokens
        if (typeof localStorage != "undefined") {
          localStorage.setItem("token", data.token);
        }
      },
      error: error => {
        // write the error on the cache
        // TODO: Create a Login Type with status and errors on it
        cache.writeData({
          data: {
            loginErrors: parseError(error)
          }
        })
      }
    });
  }
}