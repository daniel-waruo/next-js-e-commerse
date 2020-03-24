import {withApollo} from "../apollo";
import {HomePage} from "../components/index";
import {withApp} from "../components/app";

export default withApollo()(
  withApp(HomePage)
);
