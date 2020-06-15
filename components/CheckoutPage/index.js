import React from 'react';
import {MDBRow, MDBCol} from 'mdbreact';
import {OrderSummary} from "../OrderSummary";
import {graphql} from 'react-apollo';
import compose from "lodash.flowright";
import {cartQuery} from "../CartPage/queries";
import MainLoader from "../MainLoader";
import {StepperSection} from "./components";

class CheckoutPage extends React.PureComponent {
  state = {}

  render() {
    const {data: {loading, error, cart}} = this.props
    if (loading) return <MainLoader/>;
    if (error) return null;
    return (
      <MDBRow>
        <MDBCol size={"12"} md={"9"}>
          <div className={"mt-5 mx-2"}>
            <StepperSection initialID={'him'}/>
          </div>
        </MDBCol>
        <MDBCol size={"12"} md={"3"}>
          <OrderSummary cart={cart}
                        shipping={this.state.shipping}
                        tax={this.state.tax}
                        className={"z-depth-1 p-2 position-sticky"}/>
        </MDBCol>
      </MDBRow>
    )
  }
}

export default compose(
  graphql(cartQuery)
)(CheckoutPage)