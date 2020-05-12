import React from 'react'
import {withApollo} from "../../apollo";
import ProductsPage from "../../components/ProductListPage"
import {withApp} from "../../components/App";

export default withApollo()(
  withApp(ProductsPage)
);