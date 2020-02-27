import React, {Component} from "react";
import Logo from "./logo.svg";
import {MDBCollapse, MDBIcon, MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBNavItem} from "mdbreact";
import SearchForm from "./search_form";
import UserInfoDropdown from "./userInfoDropdown";
import Link from 'next/link'

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
        style={{backgroundColor: "transparent"}}
        className={"modal-backdrop"}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    const {collapseID} = this.state;
    const cart = this.props.cart;
    const cartNumber = cart == null ? 0 : cart.products.length;
    return (
      <>
        <MDBNavbar color="white" light expand="lg" fixed="top" scrolling>
          <Link href="/">
            <a className={" navbar-brand py-0 font-weight-bold"}>
              <img src={Logo} style={{height: "2.5rem", width: "2.5rem"}}/>
              <strong className="align-middle">E-commerce store React</strong>
            </a>
          </Link>
          <MDBNavbarToggler
            onClick={this.toggleCollapse("mainNavbarCollapse")}
          />
          <MDBCollapse
            id="mainNavbarCollapse"
            isOpen={this.state.collapseID}
            navbar
          >
            <SearchForm />
            <MDBNavbarNav right>
              <MDBNavItem>
                <Link href="/">
                  <a className={"nav-link"}  onClick={this.closeCollapse("mainNavbarCollapse")}>
                    <MDBIcon icon="home" className="mr-1"/>
                    <strong>Home</strong>
                  </a>
                </Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link href="#">
                  <a className={"nav-link waves-effect waves-light"}>
                    <MDBIcon icon="envelope" className="mr-1"/>
                    Contact Us
                  </a>
                </Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link href="#">
                  <a className={"nav-link waves-effect waves-light"}>
                    <MDBIcon icon="cog" className="mr-1"/>
                    Settings
                  </a>
                </Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link href="/cart">
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
              <MDBNavItem>
                <UserInfoDropdown
                  logout={this.props.logout}
                  user={this.props.user}
                />
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        {this.state.collapseID ? overlay : null}
      </>
    );
  }
}

export default MainNavbar;
