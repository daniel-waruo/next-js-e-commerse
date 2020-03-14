import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBModal, MDBRow} from "mdbreact";
import DialogPanel from './dialogPanel'
import {graphql, Query} from 'react-apollo';
import compose from 'lodash.flowright'

import {SpinnerLoader} from "../../global/index"
import CarouselProduct from "../../product/components/carouselProduct";
import {
  addToCart,
  APP_QUERY,
  PRODUCT_QUERIES,
  removeCartDialog,
  removeProductDialog,
  showCartDialog,
  showProductDialog
} from '../queries';


class ProductDialog extends React.Component {
  static defaultProps = {
    productDialog: {
      visible: false,
      productID: null
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      product: {
        number: 1
      }
    }
  }

  handleChange = e => {
    this.setState({product: {number: e.target.value}})
  };
  toggle = () => {
    const {visible, productID} = this.props.productDialog;
    if (visible) {
      this.props.removeDialog()
    }
    else {
      this.props.showProductDialog({
        variables: {
          productID: productID
        }
      })
    }
  };
  addToCart = (inCart, productName) => {
    const {productID} = this.props.productDialog;

    if (!inCart) {
      this.props.addToCart({
        variables: {
          productID: productID,
          productNumber: this.state.product.number
        },
        refetchQueries: [
          {query: APP_QUERY},
          {query: PRODUCT_QUERIES}]
      })
    }

    this.props.showCartDialog(
      {
        variables: {
          status: !inCart ? 'success' : 'inCart',
          productName: productName
        }
      }).then(
      data => {
        this.props.removeDialog()
      }
    );
  };

  render() {
    // get visible and product ID from product Dialog
    const {visible, productID} = this.props.productDialog;
    if (visible === true) {
      return (
        <Query query={PRODUCT_QUERIES} variables={{productID: productID}} fetchPolicy="network-only">
          {({data, loading, error}) => {
            if (loading) return <SpinnerLoader/>;
            if (error) return <p>Add Cart Error :( </p>;

            const product = data.product,
              productImages = product.images.map(
                (image) => image.image
              );
            return (
              <MDBModal
                isOpen={visible}
                toggle={this.toggle}
                className={"my-3"}
                size="fluid" centered
                contentClassName={"rgba-black-strong text-light"}
              >
                <MDBRow>
                  <MDBCol size={"12"} lg={"7"}>
                    <div className={"z-depth-1 rounded m-1"}>
                      <CarouselProduct objects={productImages} heightClass={"f-85"}/>
                    </div>
                  </MDBCol>
                  <MDBCol size={"12"} lg={"5"} className={"m-auto"}>
                    <div className={"z-depth-1 rounded m-1 py-3"}>
                      <DialogPanel
                        product={product}
                        handleChange={this.handleChange}
                        addToCart={e => this.addToCart(product.inCart, product.name)}
                        removeDialog={this.props.removeDialog}/>
                    </div>
                  </MDBCol>
                  <MDBBtn
                    onClick={this.toggle}
                    style={{
                      top: "0",
                      right: "0",
                      zIndex: "1051",
                      opacity: "0.5"
                    }}
                    color={"white"}
                    aria-label={"close"}
                    className={"position-absolute rounded-pill"}>
                    <MDBIcon size={"2x"} icon={"times"}/>
                  </MDBBtn>
                </MDBRow>
              </MDBModal>
            )
          }
          }
        </Query>
      )
    }
    return null
  }
}


const withApollo = compose(
  graphql(showProductDialog, {name: 'showProductDialog'}),
  graphql(removeProductDialog, {name: 'removeDialog'}),

  graphql(addToCart, {name: 'addToCart'}),
  graphql(showCartDialog, {name: 'showCartDialog'}),
  graphql(removeCartDialog, {name: 'removeCartDialog'})
);

export default withApollo(ProductDialog);

