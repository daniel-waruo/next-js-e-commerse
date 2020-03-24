import React from 'react'
import ProductsPage from "../../../components/products"
import {withApollo} from "../../../apollo";
import {withApp} from "../../../components/app";

export default withApollo()(
  withApp(ProductsPage)
);