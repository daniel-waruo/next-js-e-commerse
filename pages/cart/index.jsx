import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import {Cart, EmptyCart, OrderSummary} from "../../components/cart/components";
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {cartQuery, removeFromCart, updateCart} from '../../components/cart/queries'
import {APP_QUERY} from "../../components/app/queries";
import {SpinnerLoader} from '../../components/global/index';
import {withApp} from '../../components/app/index'


class CartPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateProducts: []
    }
  };

  handleUpdate = (productID, number) => {
    // initialize an empty products array
    let products = [];
    // if not empty
    if (this.state.updateProducts.length) {
      // flag for telling us if there is any update
      let isNew = true;

      // update the data in updateProducts
      products = this.state.updateProducts.map(
        product => {
          //check if the product is to be changed
          if (product.pk === productID)
          //changed product number
            isNew = false;
          product.number = parseInt(number);
          // return product
          return product
        });
      // add new product if flag isNew is true
      if (isNew)
        products.push({
          pk: productID,
          number: parseInt(number),
          __typename: 'CartProduct'
        });
    }
    else {
      // push graphQl type product to the products array
      products.push({
        pk: productID,
        number: parseInt(number),
        __typename: 'CartProduct'
      });
    }
    // update state
    this.setState({updateProducts: products});
  };

  removeFromCart = productID => {
    // find the product to remove from the array
    const product = this.state.updateProducts.find(
      (product) => product.id === productID
    );
    // remove the product from products array
    let products = this.state.updateProducts;
    products.splice(products.indexOf(product), 1);
    // set the new state of the application
    this.setState({products: products});

    // run remove from cart mutation
    this.props.removeFromCart({
      variables: {
        productID: productID
      },
      refetchQueries: [
        {query: cartQuery},
        {query: APP_QUERY}
      ]
    })
  };

  updateCart = e => {
    let products = this.state.updateProducts;
    if (products.length)
      this.props.updateCart({
        variables: {
          products: products
        },
        refetchQueries: [
          {query: cartQuery},
          {query: APP_QUERY}
        ]
      }).then(data =>
        this.setState({updateProducts: []}))
  };

  render() {
    const {
      data: {
        loading,
        error,
        cart
      }
    } = this.props;
    if (loading) return <SpinnerLoader/>;
    // look for a Server Error Page
    if (error) return null;

    if (!cart.products.length) {
      return <EmptyCart/>
    }
    return (
      <div className={"page"}>
        <MDBContainer fluid className={"mt-2"}>
          <MDBRow>
            <MDBCol lg={"9"}>
              <Cart removeFromCart={this.removeFromCart}
                    handleUpdate={this.handleUpdate}
                    updateCart={this.updateCart}
                    cart={cart}
                    className={"z-depth-1 p-1"}/>
            </MDBCol>
            <MDBCol lg={"3"}>
              <OrderSummary className={"z-depth-1 p-1"}/>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const withApollo = compose(
  graphql(cartQuery),
  graphql(removeFromCart, {name: 'removeFromCart'}),
  graphql(updateCart, {name: 'updateCart'})
);


export default withApp({ssr: false})(withApollo(CartPage));
