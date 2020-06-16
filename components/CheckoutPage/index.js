import React from 'react';
import {MDBRow, MDBCol} from 'mdbreact';
import {OrderSummary} from "../OrderSummary";
import {graphql} from 'react-apollo';
import compose from "lodash.flowright";
import {cartQuery} from "../CartPage/queries";
import MainLoader from "../MainLoader";
import {StepperSection} from "./components/StepperSection";

class CheckoutPage extends React.PureComponent {
  state = {}

  render() {
    const {data: {loading, error, cart}} = this.props
    if (loading) return <MainLoader/>;
    if (error) return null;
    return (
      <div className={"px-2"}>
        <MDBRow center>
          <MDBCol size={"12"} sm={"10"} md={"8"} lg={"8"} xl={"9"} className={"mb-3 h-100"}>
            <div className={"pt-5 pb-2 z-depth-1 rounded"}>
              <StepperSection/>
            </div>
          </MDBCol>
          <MDBCol size={"12"} sm={"10"} md={"8"} lg={"4"} xl={"3"} className={"h-100"}>
            <OrderSummary cart={cart}
                          shipping={this.state.shipping}
                          tax={this.state.tax}
                          className={"z-depth-1 rounded p-2 position-sticky"}/>
          </MDBCol>
        </MDBRow>
      </div>
    )
  }
}

export default compose(
  graphql(cartQuery)
)(CheckoutPage)