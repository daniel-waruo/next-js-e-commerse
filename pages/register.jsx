import React from "react";
import {withApollo} from "../apollo";
import RegisterPage from "../components/register"
import {withApp} from "../components/app";

export default withApollo()(
  withApp(RegisterPage)
);