import React from 'react'
import {MDBRow, MDBCol, MDBInput,MDBContainer} from 'mdbreact'

export default class DeliveryDataForm extends React.PureComponent {
  render() {
    return (
      <MDBContainer className={"py-3"}>
        <h1 className={"text-center"}>Delivery Contact Information</h1>
        <MDBRow>
          <MDBCol size={"10"} sm={"6"}>
            <MDBInput
              label="Name"
              icon="user"
              group
              validate
              required
            />
          </MDBCol>
          <MDBCol size={"10"} sm={"6"}>
            <MDBInput
              label="Email"
              icon="envelope"
              group
              type="email"
              validate
              required
            />
          </MDBCol>
          <MDBCol size={"10"} sm={"6"}>
            <MDBInput
              label="Phone Number"
              icon="phone"
              group
              validate
              required
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}