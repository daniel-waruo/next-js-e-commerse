import cookie from 'js-cookie'

const postConfig = data => {
  let token;
  token = cookie.get('token') || null;
  const anonymous_session = cookie.get('anonymous_session');

  return {
    method: 'POST', // set as in POST
    cache: 'no-cache', // disable cache
    credentials: 'include',
    headers: {
      'Authorization': token ? `Token ${token}` : "",
      'Content-Type': 'application/json',
      'anonymous-session': anonymous_session
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }
};

// function for handling post data
async function post(config = {
  url: '',
  data: {},
  success: undefined,
  error: undefined
}) {
  // initialize response variable
  let response;
  // try to send a request to the server
  try {
    //send a request to the server and store it in response variable
    response = await fetch(config.url, postConfig(config.data));
  } catch (ex) {
    // console the exception if there is any
    return console.error(ex);
  }
  // if the response is not successful run the error function in config
  if (!response.ok)
  // parse the response to json and run the errors in the error function
    await response.json().then(config.error);
  else
  // parse the response to json and run the data in the data function
    await response.json().then(config.success);
}

export const request = {
  post: post
};