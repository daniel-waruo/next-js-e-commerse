import {withApollo} from "../apollo";
import IndexPage from "../components/IndexPage";
import {withApp} from "../components/App";

export default withApollo()(
  withApp(IndexPage)
);
