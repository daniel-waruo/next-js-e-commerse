import React from 'react';
import {withApollo} from "../../../apollo";
import ProductPage from "../../../components/ProductPage"
import {withApp} from "../../../components/App";

export default withApollo()(
  withApp(ProductPage)
);
  