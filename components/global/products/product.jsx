import React from 'react';
import {MDBCard, MDBCardBody, MDBCardImage, MDBMask, MDBView} from "mdbreact";
import Rating from "react-rating";
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {APP_QUERY} from "../../app/queries";
import Link from "next/link";
import Router from "next/router"

class ProductCard extends React.Component {
  clickHandlerBig = () => {
    /* if in large devices show the product modal */
    const {product, showProductDialog} = this.props;
    const id = parseInt(product.id) ? product.id : product.pk;

    showProductDialog({
      variables: {
        productID: id
      },
      refetchQueries: [
        {
          query: APP_QUERY
        }]
    })
  };

  clickHandlerSmall = () => {
    /* if in small devices redirect to products page don't show the modal*/
    const {product} = this.props;
    Router.push("/products/[category]/[slug]", `/products/${product.category.slug}/${product.slug}`).then(
      () => window.scrollTo(0, 0)
    )
  };

  render() {
    const {product} = this.props;
    // get first image from list of product images
    // TODO:designate a primary product image
    const productImage = product.images[0].image;

    return (
      <MDBCard cascade color="transparent" className={this.props.className}>
        <MDBView>
          <div onClick={this.clickHandlerBig}>
            <MDBCardImage cascade zoom className="img-fluid" src={productImage + "-/scale_crop/500x500/smart/"}/>
            <MDBCardBody cascade className="p-1" color="transparent">
              <div className={"text-center card-text"}>
                <h5 className={"text-capitalize pb-2 text-"}>{product.name}</h5>
                <h6>
                  {product.discountPrice}
                  <del className="ml-2 grey-text">{product.price}</del>
                </h6>
                <Rating
                  initialRating={2}
                  readonly
                  emptySymbol="fa fa-star text-light"
                  fullSymbol="fa fa-star yellow-text"/>
              </div>
            </MDBCardBody>
          </div>
          <MDBMask className="flex-center d-block d-lg-none" onClick={this.clickHandlerSmall}>
            <Link
              href={"/products/[category]/[slug]"}
              as={`/products/${product.category.slug}/${product.slug}`}>
              <a className={"d-none"}/>
            </Link>
          </MDBMask>
        </MDBView>
      </MDBCard>
    )
  }
}

const SHOW_PRODUCT_DIALOG = gql`
  mutation ShowProductDialog($productID:String){
    showProductDialog(productID :$productID) @client
  }
`;
const ProductCardWithMutation = graphql(
  SHOW_PRODUCT_DIALOG, {name: 'showProductDialog'}
)(ProductCard);

export default ProductCardWithMutation;