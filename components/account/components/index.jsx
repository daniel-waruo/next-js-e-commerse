import React from 'react';
import {SideNav} from '../../global/sidenav'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";

import Router from 'next/router'
import "../index.css"

const activeTabDefault = {
  account: false,
  orders: false,
  account_edit: false,
  address_book: false,
  linked_accounts: false
};

export function AccountSideNav(props) {
  const {isOpen, toggleFunction, active} = props;
  const listClass = "border border-0";
  const listClassSide = "bg-transparent text-white border border-0";
  let activeTab = activeTabDefault;
  activeTab[active] = true;
  const {account, orders, account_edit, address_book, linked_accounts} = activeTab;

  const children = (listClass) => (
    <MDBListGroup>
      <MDBListGroupItem active={account} hover className={listClass}>
        <MDBIcon far icon={"user"} className={"mr-2"}/>
        My Account
      </MDBListGroupItem>
      <MDBListGroupItem active={orders} hover className={listClass}>
        <MDBIcon fas icon={"clipboard-list"} className={"mr-2"}/>
        Orders
      </MDBListGroupItem>
      <MDBListGroupItem active={account_edit} hover className={listClass}>
        <MDBIcon fas icon={"user-edit"} className={"mr-2"}/>
        Edit Account Info
      </MDBListGroupItem>
      <MDBListGroupItem active={address_book} hover className={listClass}>
        <MDBIcon fas icon={"address-book"} className={"mr-2"}/>
        Address Book
      </MDBListGroupItem>
      <MDBListGroupItem active={linked_accounts} hover className={listClass}>
        <MDBIcon fas icon={"link"} className={"mr-2"}/>
        Linked Accounts
      </MDBListGroupItem>
    </MDBListGroup>
  );
  return (
    <>
      <MDBBtn className={"position-absolute d-md-block d-lg-none"}
              style={{zIndex: 1, display: isOpen ? "none!important" : ""}}
              onClick={toggleFunction}>
        <MDBIcon icon={"bars"}/>
      </MDBBtn>
      <SideNav isOpen={isOpen} toggleFunction={toggleFunction} className={"bg-white text-black"}>
        {children(listClass)}
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block"}>
        <div className={"m-2 z-depth-1 rounded"}>
          {children(listClass)}
        </div>
      </MDBCol>
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