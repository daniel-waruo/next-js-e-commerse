import React from 'react'
import ProductsPage from "../../../components/products"
import {withApollo} from "../../../lib/apollo";

export default withApollo()(ProductsPage);