export const parseError = error => {
  let errors = [];

  Object.entries(error).forEach(
    entry => {
      entry[1].forEach(
        message => {
          errors.push({
            message: message,
            field: entry[0],
            __typename: 'Error'
          });
        }
      )
    });

  return errors;
};


export const carouselImageStyle = (image_url, url_param) => {
  if (url_param === undefined)
    url_param = "";

  return {
    minHeight: "350px",
    backgroundColor: "transparent",
    backgroundAttachment: "scroll",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url('${image_url + url_param }')`
  }
};


export const filter = (router, object = undefined) => {
  let newQuery = {};
  if (object) {
    const {categories, min, max, query} = object;
    // add categories to new query
    if (categories) newQuery.categories = categories;
    if (min) newQuery.min = min;
    if (max) newQuery.max = max;
    if (query) newQuery.query = query;
  }

  const {query} = router;
  if (!newQuery.categories && query.categories)
    newQuery.categories = query.categories;
  if (!newQuery.min && query.min)
    newQuery.min = query.min;
  if (!newQuery.max && query.max)
    newQuery.max = query.max;
  if (!newQuery.query && query.query)
    newQuery.query = query.query;

  const category = query.category;
  if (category) {
    router.push({
      pathname: `/products/${category}`,
      query: newQuery
    })
  } else {
    router.push({
      pathname: `/products`,
      query: newQuery
    })
  }
}