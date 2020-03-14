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
