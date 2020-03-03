import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText,} from "mdbreact";
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
      <MDBCard cascade color="transparent" className={this.props.className}>
        <MDBCardImage cascade className="img-fluid" src={productImage + "-/scale_crop/500x500/smart/"}/>
        <MDBCardBody cascade className="p-1" color="transparent">
          <MDBCardText>
            <strong><b>{product.name}</b></strong>
            <br/>
            {product.description}
            <MDBBtn className="aqua-gradient rounded float-right"
                    onClick={this.addToCart}>
              ADD TO CART
            </MDBBtn>
          </MDBCardText>
          <h5>
          <span className="float-left">
              {product.discountPrice}
            <del className="ml-2 grey-text">{product.price}</del>
          </span>
          </h5>
        </MDBCardBody>
        <div className="position-absolute text-center h-50 w-100">
          <Link href={"/products/[category]/[slug]"} as={`/products/${product.category.slug}/${product.slug}`}>
            <a style={{top: '40%'}}
               className="btn btn-secondary deep-blue-gradient"
            >MORE INFORMATION</a>
          </Link>
        </div>
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