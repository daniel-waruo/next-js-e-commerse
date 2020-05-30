import React from "react";
import {withApollo} from "../apollo";
import RegisterPage from "../components/RegisterPage"
import {withApp} from "../components/App";

export default withApollo()(
  withApp(RegisterPage)
);