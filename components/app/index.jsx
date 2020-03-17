import React, {Component} from 'react';

import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import compose from 'lodash.flowright';
import {APP_QUERY} from './queries'

import CartDialog from "./components/cartAddDialog";
import MainNavbar from "./components/navbar";
import ProductDialog from "./components/productDialog";

import {MainFooter} from '../global/footer'

class App extends Component {

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

    //if (loading) return <SpinnerLoader/>;

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
        <MainNavbar loading={loading} cart={cart} user={user} logout={this.props.logout}/>
        <main style={mainStyle}>
          <ProductDialog loading={loading} productDialog={productDialog}/>
          <CartDialog loading={loading} cartDialog={cartDialog}/>
          {this.props.children}
        </main>
        <div className={"overflow-hidden"}>
          <MainFooter/>
        </div>
      </>
    );
  }
}

export const AppLayout = compose(
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
    <AppLayout>
      <PageComponent {...props} />
    </AppLayout>
  );