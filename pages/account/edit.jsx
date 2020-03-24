import {withApollo} from "../../apollo";
import AccountEdit from "../../components/account/edit";
import {withApp} from "../../components/app/index";
import {withAuthSync} from "../../utils/auth";

export default withApollo()(
  withAuthSync(// auth hoc
    withApp(AccountEdit)//with app account//
  )
)