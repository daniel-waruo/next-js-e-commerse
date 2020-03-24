import React from 'react'
import {withApollo} from "../../apollo";
import ProductsPage from "../../components/products"
import {withApp} from "../../components/app";

export default withApollo()(
  withApp(ProductsPage)
);