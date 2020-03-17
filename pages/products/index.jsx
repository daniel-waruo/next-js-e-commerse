import React from 'react'
import {withApollo} from "../../lib/apollo";
import ProductsPage from "../../components/products"

export default withApollo()(ProductsPage);