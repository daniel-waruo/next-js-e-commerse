import Router from "next/router";
import React from 'react';
import {MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBIcon} from "mdbreact";

export function AccountCard(props) {
  const {title, className, href, icon} = props;

  const onClick = e => {
    e.preventDefault();
    Router.push(href || "/")
  };

  return (
    <MDBCard className={className}>
      <MDBCardBody>
        <MDBCardTitle className={"pl-2 pb-2 border-bottom border-dark"}>
          {title}
          <a href={href || "/"} className={"float-right account-card-link"} onClick={onClick}>
            <MDBIcon icon={icon || "edit"}/>
          </a>
        </MDBCardTitle>
        <MDBCardText tag={"div"}>
          {props.children}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}