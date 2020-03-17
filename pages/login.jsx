import React from 'react';
import {withApollo} from "../lib/apollo";
import Login from "../components/login";

export default withApollo()(Login);
