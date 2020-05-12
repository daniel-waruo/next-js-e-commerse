import React from 'react';
import {SearchForm} from "./index"
import {MDBContainer} from "mdbreact";

export function EmptyCart() {
  return (
    <MDBContainer>
      <h1 className={"text-center"}>No items in the shopping cart</h1>
      <SearchForm/>
    </MDBContainer>
  );
}
