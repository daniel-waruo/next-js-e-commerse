import React from 'react';
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdbreact";

import Rating from "react-rating";
import {NextSeo} from 'next-seo';
import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";

import {PRODUCT_QUERIES} from "./queries";
import SpinnerLoader from '../global/loaders/spinnerLoader'
import {CarouselProduct} from './components';
import {addToCart, APP_QUERY, removeCartDialog, showCartDialog} from "../app/queries";
import ProductNumberInput from "../ProductNumberInput";


class Product extends React.Component {
  state = {
    number: 1
  };

  changeHandler = e => {
    this.setState({number: e.target.value})
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
              productSlug: getProductSlug(this.props)
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
      })
  };

  render() {
    const {
      data: {
        loading,
        error,
        product
      }
    } = this.props;

    if (loading) return <SpinnerLoader/>;

    if (error) return <p>Error :(</p>;

    const productImages = product.images.map(image => image.image);

    return (
      <>
        <NextSeo title={product.name} description={product.description}/>
        <div className={"page px-1"}>
          <MDBRow>
            <MDBCol size="12" md="6" lg="7" className="mx-auto px-2">
              <div className={"h-100 z-depth-1 rounded mb0"}>
                <CarouselProduct objects={productImages} heightClass={"f-85"}/>
              </div>
            </MDBCol>
            <MDBCol size="12" md={"6"} lg={"5"} className={"my-auto"}>
              <div className={"h-100 z-depth-1 rounded mb-0"}>
                <div className={"p-1 p-sm-4 text-center"}>
                  <h1 className={" text-capitalize"}>{product.name}</h1>
                  <p>{product.description}</p>
                  <h5 className={"my-2 mx-1"}>
                    {product.discountPrice}
                    <del className="ml-2 grey-text">{product.price}</del>
                  </h5>
                  <Rating
                    initialRating={2}
                    readonly
                    emptySymbol="fa fa-star text-light"
                    fullSymbol="fa fa-star yellow-text"/>
                  <ProductNumberInput textColor={"text-dark"}
                                      valueDefault={"1"}
                                      onChange={this.changeHandler}
                                      value={this.state.number}/>
                  <MDBRow>
                    <MDBCol md={"12"}>
                      <MDBBtn className="aqua-gradient rounded float-right w-100"
                              onClick={() => this.addToCart(product)}>
                        <MDBIcon icon="cart-plus" className={"float-left"} size={"2x"}/>
                        <span className={"h6"}>ADD TO CART</span>
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </>
    )
  }
}

function getProductSlug(props) {
  return props.router.query.slug
}

export default withRouter(
  compose(
    graphql(
      PRODUCT_QUERIES,
      {
        options: props => ({variables: {productSlug: getProductSlug(props)}})
      }
    ),
    graphql(addToCart, {name: 'addToCart'}),
    graphql(showCartDialog, {name: 'showCartDialog'}),
    graphql(removeCartDialog, {name: 'removeCartDialog'})
  )(Product)
);
