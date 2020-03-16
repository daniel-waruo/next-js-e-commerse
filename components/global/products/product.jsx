import React from 'react';
import {MDBCard, MDBCardBody, MDBCardImage} from "mdbreact";
import Rating from "react-rating";
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {APP_QUERY} from "../../app/queries";
import Link from "next/link";


class ProductCard extends React.Component {
  addToCart = () => {
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


  render() {
    const {product} = this.props;

    const productImage = product.images[0].image;

    return (
      <MDBCard cascade color="transparent" onClick={() => this.addToCart()} className={this.props.className}>
        <MDBCardImage cascade className="img-fluid" src={productImage + "-/scale_crop/500x500/smart/"}/>
        <MDBCardBody cascade className="p-1" color="transparent">
          <div className={"text-center card-text"}>
            <Link
              href={"/products/[category]/[slug]"}
              as={`/products/${product.category.slug}/${product.slug}`}>
              <a className={"d-none"}/>
            </Link>
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