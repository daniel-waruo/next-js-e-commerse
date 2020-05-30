import {withApollo} from "../apollo";
import {withApp} from "../components/App";
import CheckoutPage from "../components/CheckoutPage";

export default withApollo({ssr: false})(
    withApp(CheckoutPage)
);
