import React from 'react';
import {MDBCol, MDBRow} from "mdbreact";
import ProductCard from "../../global/products/product";

class ProductsHome extends React.PureComponent {
  render() {
    const props = this.props;
    // create a list of product cards to display
    const productList = props.products.map((product, index) =>
      <MDBCol sm="6" md="4" lg="3" className="my-2" key={index}>
        <ProductCard product={product.product} className={"h-100 z-depth-half rounded"}/>
      </MDBCol>
    );//render a list of product components from the product objects
    return (
      <>
        <MDBRow id="categories">
          {productList}
        </MDBRow>
      </>
    )
  }
}


export default ProductsHome;