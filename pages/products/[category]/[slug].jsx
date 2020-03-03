import React from 'react';
import {MDBBtn, MDBCol, MDBIcon, MDBInputGroup, MDBRow} from "mdbreact";

import Rating from "react-rating";

import {graphql} from 'react-apollo';
import compose from "lodash.flowright";

import {PRODUCT_QUERIES} from '../../../components/product/queries.jsx';
import {SpinnerLoader} from '../../../components/global';
import {CarouselProduct} from '../../../components/product/components';
import {withRouter} from 'next/router'
import {withApp} from "../../../components/app/index";
import {withApollo} from "../../../lib/apollo";


class Product extends React.Component {

  render() {
    const {
      data: {
        loading,
        error,
        product
      }
    } = this.props;

    if (loading) return <SpinnerLoader/>;
    // display error
    if (error) return <p>Error :(</p>;

    // get the product information
    const productImages = product.images.map(
      (image) => image.image
    );

    return (
      <div className={" page mx-1"}>
        <MDBRow>
          <MDBCol md="6" lg="7" className="mx-auto px-2">
            <CarouselProduct objects={productImages} heightClass={"f-85"}/>
          </MDBCol>
          <MDBCol md={"6"} lg={"5"}>
            <div className={"mx-2"}>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <Rating
                initialRating={2}
                readonly
                emptySymbol="fa fa-star fa-2x text-light"
                fullSymbol="fa fa-star fa-2x yellow-text"
              />
              <h5 className={"m-1"}>
                {product.discountPrice}
                <del className="ml-2 grey-text">{product.price}</del>
              </h5>

              <MDBInputGroup material containerClassName="mb-3 mt-0 w-50"
                             size={"lg"}
                             type="number"
                             valueDefault={1}
                             min={1}
                             max={1000000}
                             hint="Number of Products"
                             prepend={
                               "Quantity"
                             }
              />
              <MDBRow>
                <MDBCol md={"6"}>
                  <MDBBtn className="aqua-gradient rounded float-right w-100">
                    <MDBIcon icon="cart-plus" className={"float-left"} size={"2x"}/>
                    <span className={"h6"}>ADD TO CART</span>
                  </MDBBtn>
                </MDBCol>
                <MDBCol md={"6"}>
                  <MDBBtn className="blue-gradient-rgba rounded float-right w-100">
                    <MDBIcon icon={"money-bill-alt"} className={"float-left"} size={"2x"}/>
                    <span className={"h6"}>BUY NOW</span>
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    )
  }
}

function getProductSlug(props) {
  return props.router.query.slug
}


export default withApollo()(withApp(
  withRouter(
    compose(
      graphql(
        PRODUCT_QUERIES,
        {
          options: (props) => ({variables: {productSlug: getProductSlug(props)}})
        }
      )
    )(Product))
));
  