import {withApollo} from "../lib/apollo";
import AccountPage from "../components/account";
import {withApp} from "../components/app";
import {withAuthSync} from "../utils/auth";

export default withApollo()(
  withAuthSync(// auth hoc
    withApp(AccountPage)//with app account//
  )
)