import {withApollo} from "../../apollo";
import AccountPage from "../../components/account/index";
import {withApp} from "../../components/app/index";
import {withAuthSync} from "../../utils/auth";

export default withApollo()(
  withAuthSync(// auth hoc
    withApp(AccountPage)//with app account//
  )
)