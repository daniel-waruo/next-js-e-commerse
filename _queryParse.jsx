function parseQuery(queryString) {
  let query = {};
  // if query String false return empty object
  if (!queryString)
    return {};

  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    let key = decodeURIComponent(pair[0])
      , value = decodeURIComponent(pair[1] || '');

    if (key.endsWith("[]")) {
      if (key === "query")
        alert(key);
      key = key.split("[]")[0];
      value = value.split("+");
    }

    query[key] = value;
  }
  return query;
}

function parseObject(object) {
  return Object.keys(object).map(
    key => {
      // get value from object3
      let value = object[key];
      //
      if (Array.isArray(value) && key && value) {
        key = key + "[]";
        value = value.join("+");
      }
      if (!key || !value)
        return undefined;
      return key + '=' + value
    }).filter(Boolean).join('&')

}

export default {
  toQuery: parseObject,
  toObject: parseQuery
}
