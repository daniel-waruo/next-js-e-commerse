import React from 'react';
import {withApollo} from "../apollo/lib/apollo";
import LoginPage from "../components/LoginPage";
import {withApp} from "../components/App";

export default withApollo()(
  withApp(LoginPage)
);
