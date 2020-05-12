import {withApollo} from "../apollo";
import CartPage from "../components/CartPage"
import {withApp} from "../components/App";

export default withApollo({ssr:false})(
  withApp(CartPage)
);
