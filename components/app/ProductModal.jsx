import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBModal, MDBRow} from "mdbreact";
import {graphql, Query} from 'react-apollo';
import compose from 'lodash.flowright';
import ProductNumberInput from '../ProductNumberInput';
import Link from 'next/link';
import SpinnerLoader from '../global/loaders/spinnerLoader';
import CarouselProduct from '../product/components/carouselProduct';
import Rating from "react-rating";
import gql from 'graphql-tag'

import {
  addToCart,
  APP_QUERY,
  PRODUCT_QUERIES,
  removeCartDialog,
  removeProductDialog,
  showCartDialog,
  showProductDialog
} from './queries';


class ProductModal extends React.PureComponent {
  state = {
    number: 1
  };

  changeHandler = e => {
    this.setState({number: e.target.value})
  };

  toggle = () => {
    const {productDialog: {visible, productID}} = this.props.data;
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

  addToCart = product => {
    const {id, inCart, name} = product;
    if (!inCart) {
      this.props.addToCart({
        variables: {
          productID: id,
          productNumber: this.state.number
        },
        refetchQueries: [
          {query: APP_QUERY},
          {
            query: PRODUCT_QUERIES,
            variables: {
              productID: id
            }
          }]
      })
    }

    this.props.showCartDialog(
      {
        variables: {
          status: !inCart ? 'success' : 'inCart',
          productName: name
        }
      }).then(
      () => {
        this.props.removeDialog()
      }
    );
  };

  render() {
    const {data: {loading, error, productDialog}} = this.props;

    if (loading) return null;

    if (error) return null;

    const {visible, productID} = productDialog;

    if (visible === false) return null;

    return (
      <Query query={PRODUCT_QUERIES} variables={{productID: productID}} fetchPolicy="network-only">
        {({data, loading, error}) => {
          if (loading) return <SpinnerLoader/>;

          if (error) return <p>Add Cart Error :( </p>;

          const {product} = data;

          const productImages = product.images.map(
            (image) => image.image
          );

          return (
            <MDBModal isOpen={visible} toggle={this.toggle} className={"my-3"} size="fluid" centered
                      contentClassName={"rgba-black-strong text-light"}>
              <MDBRow>
                <MDBCol size={"12"} md={"6"} lg={"7"}>
                  <div className={"z-depth-1 rounded m-1"}>
                    <CarouselProduct objects={productImages} heightClass={"f-85"}/>
                  </div>
                </MDBCol>
                <MDBCol size={"12"} md={"6"} lg={"5"} className={"m-auto"}>
                  <div className={"z-depth-1 rounded m-1 py-3"}>
                    <div className={"mx-2 text-center"}>
                      <h1 className={"text-center text-capitalize py-0"}>{product.name}</h1>
                      <p>{product.description}</p>
                      <h5 className={"m-1"}>
                        {product.discountPrice}
                        <del className="ml-2 grey-text">{product.price}</del>
                      </h5>
                      <Rating
                        initialRating={2}
                        readonly
                        emptySymbol="fa fa-star text-light"
                        fullSymbol="fa fa-star yellow-text"
                      />
                      <ProductNumberInput textColor={"text-light"}
                                          valueDefault={"1"}
                                          onChange={this.changeHandler}
                                          value={this.state.number}/>

                      <MDBRow className={"px-0 px-md-2 py-2"}>
                        <MDBCol className={"mx-auto"}>
                          <MDBBtn className="aqua-gradient rounded-pill" onClick={() => this.addToCart(product)}>
                            <MDBIcon icon="cart-plus" className={"float-left"} size={"2x"}/>
                            <span className={"ml-2"}>ADD TO CART</span>
                          </MDBBtn>
                        </MDBCol>
                        <div className={"w-100"}/>
                        <MDBCol className={"mx-auto"}>
                          <Link href={"/products/[category]/[slug]"}
                                as={`/products/${product.category.slug}/${product.slug}`}>
                            <a style={{top: '40%'}}
                               onClick={this.toggle}
                               className="btn btn-secondary blue-gradient-rgba float-right rounded-pill w-100">
                              <MDBIcon icon="plus-circle" className={"float-left"} size={"2x"}/>
                              <span>MORE INFORMATION</span>
                            </a>
                          </Link>
                        </MDBCol>
                      </MDBRow>
                    </div>
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
        }}
      </Query>
    )
  }
}

const productModalQuery = gql`
  query{
    productDialog @client {
      visible
      productID
    }
  }
`;

const withApollo = compose(
  graphql(showProductDialog, {name: 'showProductDialog'}),
  graphql(removeProductDialog, {name: 'removeDialog'}),
  graphql(productModalQuery),
  graphql(addToCart, {name: 'addToCart'}),
  graphql(showCartDialog, {name: 'showCartDialog'}),
  graphql(removeCartDialog, {name: 'removeCartDialog'})
  )
;

export default withApollo(ProductModal);

