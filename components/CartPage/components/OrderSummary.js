import React from "react";
import PropTypes from 'prop-types'

export class OrderSummary extends React.PureComponent {
  render() {
    //TODO:implement real data on Order Summary
    // get the cart products data from props
    const {cart: {total}, className} = this.props;
    // create cart items to render
    return (
      <div className={className}>
        <div className="box-header">
          <h3 className="mb-0 text-center">Order summary</h3>
        </div>
        <p className="text-muted px-3 pt-3">
          Shipping and additional costs are calculated based on the values you
          have entered.
        </p>
        <div className="table-responsive">
          <table className="table">
            <tbody>
            <tr>
              <td>Order subtotal</td>
              <th>{total}</th>
            </tr>
            <tr>
              <td>Shipping and handling</td>
              <th>N/A</th>
            </tr>
            <tr>
              <td>Tax</td>
              <th>N/A</th>
            </tr>
            <tr className="total">
              <td>Total</td>
              <th>{total}</th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  cart: PropTypes.object.isRequired,
  className: PropTypes.string
};