import {withApollo} from "../lib/apollo";
import CartPage from "../components/cart"
import {withApp} from "../components/app";

export default withApollo()(
  withApp(CartPage)
);
