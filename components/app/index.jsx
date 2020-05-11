import React, {Component} from 'react';
import MainNavbar from "./MainNavbar";
import ProductModal from "./ProductModal"
import AddedToCartModal from "./AddedToCartModal"

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

    return (
      <>
        <MainNavbar/>
        <ProductModal/>
        <AddedToCartModal/>
        <main style={mainStyle}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export const withApp = PageComponent =>
  props => (
    <App>
      <PageComponent {...props} />
    </App>
  );