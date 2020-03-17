import React from "react";
import {withApollo} from "../lib/apollo";
import RegisterPage from "../components/register"

export default withApollo()(RegisterPage);