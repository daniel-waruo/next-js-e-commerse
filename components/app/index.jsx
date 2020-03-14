import React from 'react';

import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import compose from 'lodash.flowright';
import {APP_QUERY} from './queries'

import {CartDialog, MainNavbar, ProductDialog} from "./components";
import {MainFooter, SpinnerLoader} from '../global'

class App extends React.Component {

  render() {
    const mainStyle = {
      paddingTop: "0.75rem",
      paddingBottom: "2rem",
      minHeight: '90vh',
      marginRight: 1,
      marginLeft: 1,
      overflow: 'hidden'
    };
    const {
      data: {
        loading,
        error,
        user,
        cart,
        productDialog,
        cartDialog
      }
    } = this.props;

    if (loading) return <SpinnerLoader/>;

    if (error) {
      console.log(error);
      return (
        <>
          <h1 className={"text-center"}>OOPS THERE IS AN ERROR</h1>
        </>
      );
    }


    return (
      <>
        <MainNavbar cart={cart} user={user} logout={this.props.logout}/>
        <main style={mainStyle}>
          <ProductDialog productDialog={productDialog}/>
          <CartDialog cartDialog={cartDialog}/>
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