import React from 'react';
import {withApollo} from "../apollo/lib/apollo";
import Login from "../components/login";
import {withApp} from "../components/app";

export default withApollo()(
  withApp(Login)
);
