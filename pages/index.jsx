import {withApollo} from "../lib/apollo";
import {HomePage} from "../components/index";
import {withApp} from "../components/app";

export default withApollo()(
  withApp(HomePage)
);
