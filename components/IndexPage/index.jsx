import React, {Component} from 'react'
import {MDBCol, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo'
import {HOME_QUERIES} from './queries'
import {CategoryMenuLinks, HomeCarousel, HomeProducts} from "./components"
import MainLoader from '../MainLoader'
import {NextSeo} from 'next-seo'

class IndexPage extends Component {
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

    if (loading) return <MainLoader/>;
    // show error message
    //TODO: redirect to Error Page
    if (error) return <p>Error :(</p>;

    return (
      <>
        <NextSeo
          title={"Home"}
          description={
            "Next JS E-commerce by Daniel Waruo is an e-commerce store developed " +
            "by Daniel Waruo for B2C model businesses.One cannot make real purchases of the products"
          }
        />
        <MDBRow className={"mx-1 my-1"}>
          <MDBCol md={"3"} className="f-85 d-none d-md-block ">
            <div className={"h-100 z-depth-1 rounded mb0"}>
              <CategoryMenuLinks categories={allCategories}/>
            </div>
          </MDBCol>
          <MDBCol md={"9"} className={"p-0 z-depth-1 rounded mb-0"}>
            <HomeCarousel objects={allCarousel} heightClass="f-85"/>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol size={"12"} className={"mt-4"}>
            <div className={"p-2 m-2 z-depth-1 rounded mb-0"}>
              <h1 className={"text-center py-3"}>Featured Products</h1>
              <HomeProducts products={allFeaturedProducts}/>
            </div>
          </MDBCol>
        </MDBRow>
      </>
    )//content to be rendered after page load
  }
}

export default graphql(HOME_QUERIES)(IndexPage);