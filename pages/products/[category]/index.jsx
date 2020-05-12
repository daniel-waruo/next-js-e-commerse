import React from 'react'
import ProductListPage from "../../../components/ProductListPage"
import {withApollo} from "../../../apollo";
import {withApp} from "../../../components/App";

export default withApollo()(
  withApp(ProductListPage)
);