import {withApollo} from "../lib/apollo";
import AccountPage from "../components/account";
import {withApp} from "../components/app";

export default withApollo()(
  withApp(AccountPage)
);