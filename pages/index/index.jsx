import React from "react";
import {MDBRow} from "mdbreact";
import {graphql} from 'react-apollo';
import {HOME_QUERIES} from '../../components/index/queries.jsx';
import {CarouselHome, ProductsHome} from "../../components/index/components";

import {SpinnerLoader} from '../../components/global/index'
import {withApp} from "../../components/app/index";


class Home extends React.Component {

  render() {
    // get data from apollo's  data prop
    const {
      data: {
        loading,
        error,
        allCarousel,
        allCategories,
        allFeaturedProducts
      }
    } = this.props;

    if (loading) return <SpinnerLoader/>;
    // show error message
    //TODO: redirect to Error Page
    if (error) return <p>Error :(</p>;

    return (
      <div className="page mx-3">
        <MDBRow>
          <CarouselHome objects={allCarousel} heightClass="f-90"/>
        </MDBRow>
        <ProductsHome products={allFeaturedProducts}/>
      </div>
    )//content to be rendered after page load
  }
}

export default withApp({ssr: false})(
  graphql(HOME_QUERIES)(Home)
);
