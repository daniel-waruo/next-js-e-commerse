import React from 'react';
import {MDBCol, MDBRow} from "mdbreact";

import MainLoader from "./MainLoader"
import ProductCard from "./ProductCard";


class ProductView extends React.Component {

  render() {
    // get data from apollo's data prop
    const {data: {loading, error, filterProducts}} = this.props;
    // if loading show loader
    if (loading) return <MainLoader/>;

    // show error message
    // TODO;show error page
    if (error) return `Error! ${error.message}`;
    // get products from filterProducts
    const products = filterProducts.products.edges;
    // return rendered component
    return (
      <MDBRow center>
        {products.map((product, index) => (
          <MDBCol size={"12"} sm={"6"} md={"4"} lg={"3"} className="my-2" key={index}>
            <ProductCard product={product.node}/>
          </MDBCol>
        ))}
      </MDBRow>
    )
  }
}

export default ProductView;