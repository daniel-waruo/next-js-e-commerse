import React from 'react';
import {SideNav} from '../../global/sidenav'
import {MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBIcon} from "mdbreact";
import Router from 'next/router'
import "../index.css"


export function AccountSideNav(props) {
  const {isOpen, toggleFunction, active, width} = props;
  return (
    <>
      <SideNav isOpen={isOpen} toggleFunction={toggleFunction} className={""}>
        {props.children}
      </SideNav>
      <div>
        {props.children}
      </div>
    </>
  )
}

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
          <div className={"float-right account-card-link"}>
            <MDBIcon icon={icon || "edit"} onClick={onClick}/>
          </div>
        </MDBCardTitle>
        <MDBCardText tag={"div"}>
          {props.children}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}