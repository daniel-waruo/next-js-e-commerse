import React from 'react';
import MainNavbar from "./MainNavbar";
import ProductModal from "./ProductModal"
import AddedToCartModal from "./AddedToCartModal"
import compose from "lodash.flowright";
import {graphql, useQuery} from "react-apollo";
import {APP_QUERY} from "./queries";
import MainLoader from "../MainLoader";
import {useRouter} from 'next/router'

const mainStyle = {
  paddingTop: "0.75rem",
  paddingBottom: "2rem",
  minHeight: '90vh',
  marginRight: 1,
  marginLeft: 1,
  overflow: 'hidden'
};

function App(props) {
  const {loading, error, data} = useQuery(APP_QUERY);

  if (loading) return <MainLoader/>;

  if (error) return <h1>Error in Main App</h1>;

  const {user} = data;

  if (!user && props.secure) {
    const router = useRouter()
    const {pathname} = router;
    return router.push({
      pathname: '/login',
      query: {next: pathname}
    });
  }

  return (
    <>
      <MainNavbar/>
      <ProductModal/>
      <AddedToCartModal/>
      <main style={mainStyle}>
        {props.children}
      </main>
    </>
  );
}

export const withApp = (PageComponent, secure = false) =>
  props => (
    <App secure={secure}>
      <PageComponent {...props} />
    </App>
  );