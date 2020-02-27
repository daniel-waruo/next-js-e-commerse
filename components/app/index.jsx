import React, {Component} from 'react';

import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import compose from 'lodash.flowright';
import {APP_QUERY} from './queries'

import {MainNavbar, ProductDialog} from "./components/index";
import {MainFooter, SpinnerLoader} from '../global/index'
import {withApollo} from "../../lib/apollo";
import fetch from 'isomorphic-unfetch';

global.fetch = fetch;

class App extends Component {

  render() {
    const mainStyle = {
      paddingTop: '5rem',
      paddingBottom: "5rem",
      minHeight: '100vh',
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

export const withApp = ({ ssr }) => PageComponent => {
  const app = props => (
    <MyApp>
      <PageComponent {...props} />
    </MyApp>
  );

  return withApollo({ssr: ssr})(app)
};
