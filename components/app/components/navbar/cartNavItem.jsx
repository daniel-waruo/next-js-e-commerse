import React from "react";
import {MDBIcon, MDBNavItem} from "mdbreact";
import Link from 'next/link'

export default function CartNavItem(props) {
  const cartNumber = props.loading ?
    (<span className="spinner-border text-primary" style={{height: "10px", width: "10px"}} role="status">
      <span className="sr-only">Loading...</span>
    </span>) : props.cart.number;
  return (
    <MDBNavItem className={"nav-item-mobile"}>
      <Link href={"/cart"}>
        <a className={"nav-link waves-effect waves-light"}>
          <MDBIcon icon="shopping-cart" className="mr-1"/>
          <sup
            style={{
              padding: 3,
              textEmphasisStyle: "bold"
            }}
            className="rounded-circle"
          >
            {cartNumber}
          </sup>
          Cart
        </a>
      </Link>
    </MDBNavItem>
  )
}