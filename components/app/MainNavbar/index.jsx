import React, {Component} from "react";
import Logo from "./logo.svg";
import {MDBBtn, MDBCol, MDBCollapse, MDBIcon, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBRow} from "mdbreact";
import SearchForm from "./SearchForm";
import UserInfoDropdown from "./UserInfoDropdown";
import Link from 'next/link'
import CartNavItem from "./CartNavItem"
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import gql from "graphql-tag";

const style = (
  <style>
    {`
      @media (max-width: 991.98px) {
        .nav-row-width{
           width:100%!important;
        }
        .center-brand{
          width:100%!important;
        }
        .nav-item-mobile{
          padding-left:40%;
        }
        .user-dropdown{
          left:0px!important;
        }
      }
      .user-dropdown{
        left:-40px!important;
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
          backgroundColor: 'rgba(0,0,0,0.3)',
          position: "fixed",
          zIndex: 1000,
          height: "100vh"
        }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    const {collapseID} = this.state;
    const {
      data: {loading, error, user, cart}
    } = this.props;

    //if (loading) return <SpinnerLoader/>;

    if (error) {
      console.log(error);
    }

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
              <CartNavItem loading={loading} cart={cart}/>
              <MDBNavItem className={"nav-item-mobile"}>
                <UserInfoDropdown
                  logout={this.props.logout}
                  user={user}
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

const navbarQueries = gql`
query{
  user{
    id
    firstName
    lastName
    email
  }
  cart{
    id
    number
    products{
      id
    }
  }
}`;

export default compose(
  graphql(navbarQueries),
  graphql(
    gql`
      mutation Logout{
        logout @client
      }
    `, {name: 'logout'}
  )
)(MainNavbar)
