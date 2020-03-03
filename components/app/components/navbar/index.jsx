import React, {Component} from "react";
import Logo from "./logo.svg";
import {MDBBtn, MDBCol, MDBCollapse, MDBIcon, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBRow} from "mdbreact";
import SearchForm from "./search_form";
import UserInfoDropdown from "./userInfoDropdown";
import Link from 'next/link'

const style = (
  <style jsx>
    {`
      @media (max-width: 991.98px) {
        .nav-row-width{
           width:100%!important;
        }
        .center-brand{
          width:100%!important;
        }
        .nav-link:hover{
          background-color:#fefefe ;
        }
        .nav-item-mobile{
          padding-left:40%
        }
      }
    `}
  </style>
);

class MainNavbar extends Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () => {
    if (window) window.scrollTo(0, 0);
    this.state.collapseID === collapseID && this.setState({collapseID: ""});
  };

  render() {
    const overlay = (
      <div
        style={{
          backgroundColor: "transparent",
          position: "fixed",
          zIndex: 1000,
          height: "100vh"
        }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    const {collapseID} = this.state;
    const cart = this.props.cart;
    const cartNumber = cart == null ? 0 : cart.products.length;

    return (
      <>
        {style}
        <MDBNavbar color="white" light expand="lg" sticky={"top"} scrolling>
          <Link href="/">
            <a className={" navbar-brand py-0 font-weight-bold text-center center-brand"}>
              <img src={Logo} style={{height: "2.5rem", width: "2.5rem"}}/>
              <strong className="align-middle">E-commerce store React</strong>
            </a>
          </Link>
          <div className={"w-100 d-lg-none"}/>
          <MDBRow className={"nav-row-width"}>
            <MDBCol>
              <SearchForm/>
            </MDBCol>
            <div className={"d-flex"}>
              <MDBBtn
                color={collapseID ? "warning" : "transparent"}
                className={"navbar-toggler float-right z-depth-half rounded-pill"}
                onClick={this.toggleCollapse("mainNavbarCollapse")}
              >
                <MDBIcon
                  className={collapseID ? "text-white" : ""}
                  icon={collapseID ? "times" : "bars"}/>
              </MDBBtn>
            </div>
          </MDBRow>
          <MDBCollapse
            id="mainNavbarCollapse"
            isOpen={collapseID}
            navbar
          >
            <MDBNavbarNav right>
              <MDBNavItem className={"nav-item-mobile"}>
                <Link href="/">
                  <a className={"nav-link nav-hover"} onClick={this.closeCollapse("mainNavbarCollapse")}>
                    <MDBIcon icon="home" className="mr-1"/>
                    <strong>Home</strong>
                  </a>
                </Link>
              </MDBNavItem>
              <MDBNavItem className={"nav-item-mobile"}>
                <Link href="#">
                  <a className={"nav-link waves-effect waves-light"}>
                    <MDBIcon icon="envelope" className="mr-1"/>
                    Contact Us
                  </a>
                </Link>
              </MDBNavItem>
              <MDBNavItem className={"nav-item-mobile"}>
                <Link href="#">
                  <a className={"nav-link waves-effect waves-light"}>
                    <MDBIcon icon="cog" className="mr-1"/>
                    Settings
                  </a>
                </Link>
              </MDBNavItem>
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
              <MDBNavItem className={"nav-item-mobile"}>
                <UserInfoDropdown
                  logout={this.props.logout}
                  user={this.props.user}
                />
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        {collapseID ? overlay : null}
      </>
    );
  }
}

export default MainNavbar;
