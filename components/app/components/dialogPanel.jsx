import React from 'react';
import {MDBBtn, MDBCol, MDBIcon, MDBInputGroup, MDBRow} from "mdbreact";
import Rating from "react-rating";
import Link from "next/link";


export default props => {
  const {product, handleChange, removeDialog, addToCart} = props;
  return (
    <div className={"mx-2 text-center"}>
      <h1 className={"text-center text-capitalize py-2"}>{product.name}</h1>
      <p>{product.description}</p>
      <h5 className={"m-1"}>
        {product.discountPrice}
        <del className="ml-2 grey-text">{product.price}</del>
      </h5>
      <Rating
        initialRating={2}
        readonly
        emptySymbol="fa fa-star fa-2x text-light"
        fullSymbol="fa fa-star fa-2x yellow-text"
      />
      <MDBInputGroup material
                     containerClassName="mb-3 mt-0 w-50 mx-auto"
                     prependClassNames={"text-white"}
                     className={"text-light"}
                     size={"lg"}
                     type="number"
                     validate
                     valueDefault={1}
                     min={1}
                     max={10}
                     hint="Number of Products"
                     prepend={
                       "Quantity"
                     }
                     textClassName={"text-light"}
                     labelClassName={"text-light"}
                     onChange={handleChange}
      />
      <MDBRow className={"px-2 py-2"}>
        <MDBCol md={"12"} className={"mx-auto"}>
          <MDBBtn className="aqua-gradient rounded-pill" onClick={addToCart}>
            <MDBIcon icon="cart-plus" className={"float-left"} size={"2x"}/>
            <span className={"ml-2"}>ADD TO CART</span>
          </MDBBtn>
        </MDBCol>
        <div className={"w-100"}/>
        <MDBCol md={"12"} lg={"7"} className={"mx-auto"}>
          <Link href={"/products/[category]/[slug]"}
                as={`/products/${product.category.slug}/${product.slug}`}>
            <a style={{top: '40%'}}
               onClick={removeDialog}
               className="btn btn-secondary blue-gradient-rgba float-right rounded-pill w-100">
              <MDBIcon icon="plus-circle" className={"float-left"} size={"2x"}/>
              <span>MORE INFORMATION</span>
            </a>
          </Link>
        </MDBCol>
      </MDBRow>
    </div>
  )
};