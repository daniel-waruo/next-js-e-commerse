import React from "react";
import {MDBContainer, MDBRow} from 'mdbreact'
import Map from "./Map";

export default class DeliveryLocation extends React.PureComponent {

  render() {
    return (
      <>
        <MDBContainer>
          <Map/>
        </MDBContainer>
      </>
    )
  }
}