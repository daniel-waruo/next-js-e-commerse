import {withApollo} from "../../apollo";
import AccountViewPage from "../../components/AccountViewPage";
import {withApp} from "../../components/app/index";
import {withAuthSync} from "../../utils/auth";

export default withApollo()(
  withAuthSync(// auth hoc
    withApp(AccountViewPage)//with app account//
  )
)