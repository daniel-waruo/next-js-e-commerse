import React, {Component} from 'react';

import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import compose from 'lodash.flowright';
import {APP_QUERY} from './queries'

import {MainNavbar, ProductDialog} from "./components/index";
import {MainFooter, SpinnerLoader} from '../global/index'
import fetch from 'isomorphic-unfetch';

// IMPORT MD BOOTSTRAP CSS
// use during build
//import './indexBuild.scss'
// uncomment during dev
// import './index.scss'

global.fetch = fetch;

class App extends Component {

  render() {
    const mainStyle = {
      paddingTop:"0.75rem",
      paddingBottom: "5rem",
      minHeight: '90vh',
      marginRight: 1,
      marginLeft: 1,
      overflow: 'hidden'
    };
    const {
      data: {
        loading,
        error,
        addCartVisible,
        addCartProductID,
        user,
        cart
      }
    } = this.props;

    if (loading) return <SpinnerLoader/>;

    if (error) return null;

    return (
      <>
        <MainNavbar cart={cart} user={user} logout={this.props.logout}/>
        <main style={mainStyle}>
          <ProductDialog isVisible={addCartVisible} productID={addCartProductID}/>
          {this.props.children}
        </main>
        <MainFooter/>
      </>
    );
  }
}

const MyApp = compose(
  graphql(APP_QUERY),
  graphql(
    gql`
      mutation Logout{
        logout @client
      }
    `, {name: 'logout'}
  )
)(App);

export const withApp = PageComponent =>
  props => (
    <MyApp>
      <PageComponent {...props} />
    </MyApp>
  );