import React from 'react';
import {withApollo} from "../../../apollo";
import Product from "../../../components/product"
import {withApp} from "../../../components/app";

export default withApollo()(
  withApp(Product)
);
  