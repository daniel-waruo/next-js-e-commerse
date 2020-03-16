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
import {addToCart, APP_QUERY, removeCartDialog, showCartDialog} from "../../../components/app/queries";
import {NextSeo} from 'next-seo';

class Product extends React.Component {
  state = {
    number: 1
  };
  onChange = e => {
    this.setState({number: e.target.value})
  };
  addToCart = () => {
    const {data: {product: {id, inCart, name}}} = this.props;
    if (inCart) {
      this.props.addToCart({
        variables: {
          productID: id,
          productNumber: this.state.number
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
          productName: name
        }
      });
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
    // display error
    if (error) return <p>Error :(</p>;

    // get the product information
    const productImages = product.images.map(
      (image) => image.image
    );

    return (
      <>
        <NextSeo
          title={product.name}
          description={product.description}
        />
        <div className={"page px-1"}>
          <MDBRow>
            <MDBCol md="6" lg="7" className="mx-auto px-2">
              <div className={"h-100 z-depth-1 rounded mb0"}>
                <CarouselProduct objects={productImages} heightClass={"f-85"}/>
              </div>
            </MDBCol>
            <MDBCol md={"6"} lg={"5"} className={"my-auto"}>
              <div className={"h-100 z-depth-1 rounded mb-0"}>
                <div className={"mx-2 p-4 text-center"}>
                  <h1 className={" text-capitalize"}>{product.name}</h1>

                  <p>{product.description}</p>

                  <h5 className={"my-2 mx-1"}>
                    {product.discountPrice}
                    <del className="ml-2 grey-text">{product.price}</del>
                  </h5>
                  <div className={"my-2 "}>
                    <Rating
                      initialRating={2}
                      readonly
                      emptySymbol="fa fa-star text-light"
                      fullSymbol="fa fa-star yellow-text"/>
                  </div>

                  <MDBInputGroup material
                                 containerClassName="mb-3 mt-0 w-50 mx-auto"
                                 size={"lg"}
                                 type="number"
                                 valueDefault={this.state.number}
                                 onChange={this.onChange}
                                 min={1}
                                 max={10}
                                 hint="Number of Products"
                                 prepend={
                                   "Quantity"
                                 }
                  />
                  <MDBRow>
                    <MDBCol md={"12"}>
                      <MDBBtn className="aqua-gradient rounded float-right w-100" onClick={this.addToCart}>
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


export default withApollo()(withApp(
  withRouter(
    compose(
      graphql(
        PRODUCT_QUERIES,
        {
          options: (props) => ({variables: {productSlug: getProductSlug(props)}})
        }
      ),
      graphql(addToCart, {name: 'addToCart'}),

      graphql(showCartDialog, {name: 'showCartDialog'}),
      graphql(removeCartDialog, {name: 'removeCartDialog'})
    )(Product))
));
  