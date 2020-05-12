import React from 'react'
import {MDBBtn, MDBCol, MDBIcon, MDBListGroup, MDBListGroupItem} from "mdbreact";
import SideNav from '../SideNav'

import {useRouter} from "next/router"

function SideNavItem(props) {
  const {className, children, href} = props;
  const router = useRouter();

  const redirect = () => {
    if (href) router.push(href)
  };
  return (
    <MDBListGroupItem active={router.pathname === href} hover className={className} onClick={redirect}>
      {children}
    </MDBListGroupItem>
  )
}

const AccountSideNavItems = props => {
  const {listClass} = props;
  return (
    <MDBListGroup>
      <SideNavItem className={listClass} href={"/account"}>
        <MDBIcon far icon={"user"} className={"mr-2"}/>
        My Account
      </SideNavItem>
      <SideNavItem className={listClass}>
        <MDBIcon fas icon={"clipboard-list"} className={"mr-2"}/>
        Orders
      </SideNavItem>
      <SideNavItem className={listClass} href={"/account/edit"}>
        <MDBIcon fas icon={"user-edit"} className={"mr-2"}/>
        Edit Account Info
      </SideNavItem>
      <SideNavItem className={listClass}>
        <MDBIcon fas icon={"address-book"} className={"mr-2"}/>
        Address Book
      </SideNavItem>
      <SideNavItem className={listClass}>
        <MDBIcon fas icon={"link"} className={"mr-2"}/>
        Linked Accounts
      </SideNavItem>
    </MDBListGroup>
  );
};

export const AccountSideNav = props => {
  const {isOpen, toggleFunction} = props;
  const listClass = "border border-0";
  const listClassSide = `${listClass} account-list-padding`;
  return (
    <>
      <MDBBtn className={"position-fixed d-md-block d-lg-none rounded-pill hover-fade"}
              style={{
                zIndex: 1,
                display: isOpen ? "none!important" : "",
                left: "1rem"
              }}
              onClick={toggleFunction}>
        <MDBIcon icon={"bars"}/>
      </MDBBtn>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction} className={"bg-white text-black"}>
        <AccountSideNavItems listClass={listClassSide}/>
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block"}>
        <div className={"m-2 z-depth-1 rounded"}>
          <AccountSideNavItems listClass={listClass}/>
        </div>
      </MDBCol>
    </>
  )
};
