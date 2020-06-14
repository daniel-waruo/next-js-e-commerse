import {withApollo} from "../../apollo";
import AccountEditPage from "../../components/AccountEditPage";
import {withApp} from "../../components/App";
import {withAuthSync} from "../../utils/auth";

export default withApollo()(
  withAuthSync(// auth hoc
    withApp(AccountEditPage,true)//with app account//
  )
)