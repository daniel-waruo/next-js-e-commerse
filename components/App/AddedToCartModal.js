import React from 'react';
import {MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import {addToCart, removeCartDialog, showCartDialog} from './queries';
import {graphql} from 'react-apollo'
import compose from 'lodash.flowright'
import Link from 'next/link'
import gql from 'graphql-tag'

class AddedToCartModal extends React.PureComponent {

  toggle = () => {
    const {cartDialog: {visible, status}} = this.props.data;
    if (visible) {
      this.props.removeCartDialog()
    }
    else {
      this.props.showCartDialog({
        variables: {
          status: status
        }
      })
    }
  };

  render() {

    const {data: {cartDialog, loading, error}} = this.props;

    if (loading) return null;

    if (error) return null;

    const {visible, status, productName} = cartDialog;
    if (visible === true) {
      const isSuccess = status === "success",
        body = isSuccess ?
          <p className={"text-center"}>
            <strong className={"text-capitalize"}>{" " + productName + " "}</strong>
            was successfully added to the cart
          </p> :
          <p className={"text-center"}>You already added
            <strong className={"text-capitalize"}>{" " + productName + " "}</strong> to cart.
          </p>,
        title = isSuccess ?
          <>
            <MDBIcon icon={"check"} className={"mx-4"}/>
            <span>Success</span>
          </>
          :
          <>
            <MDBIcon icon={"info-circle"} className={"mx-4"}/>
            <span>Already added to Cart</span>
          </>;

      return (
        <MDBModal
          isOpen={visible}
          toggle={this.toggle}
          className={"my-3"}
          centered
        >
          <MDBModalHeader toggle={this.toggle}>{title}</MDBModalHeader>
          <MDBModalBody>
            {body}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn outline color={"secondary"} className={"rounded-pill"} onClick={e => this.props.removeCartDialog()}>
              <MDBIcon icon="arrow-left" className={"p-1"}/>
              Continue shopping
            </MDBBtn>
            <Link href={"/cart"}>
              <a className="btn btn-outline-primary rounded-pill" onClick={e => this.props.removeCartDialog()}>
                <MDBIcon icon="shopping-cart" className={"p-1"}/>
                Proceed to Cart
              </a>
            </Link>
          </MDBModalFooter>
        </MDBModal>
      );

    }
    return null;
  }
}

const addedToCartModalQueries = gql`
  query {
    cartDialog @client{
      visible
      status
      productName
    }
  }
`;
const withApollo = compose(
  graphql(addedToCartModalQueries),
  graphql(removeCartDialog, {name: 'removeCartDialog'}),
  graphql(addToCart, {name: 'addToCart'}),
  graphql(showCartDialog, {name: 'showCartDialog'})
);

export default withApollo(AddedToCartModal);

