import {withApollo} from "../apollo";
import CartPage from "../components/cart"
import {withApp} from "../components/app";

export default withApollo()(
  withApp(CartPage)
);
