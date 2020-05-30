import React from 'react'
import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {MDBBtn, MDBContainer, MDBIcon} from 'mdbreact'
import {NextSeo} from 'next-seo';

import ProductView from "../ProductView"
import RangeSlider from "../RangeSlider"
import SideNav from "../SideNav"
import  MainLoader from "../MainLoader"
import {CategoryFilter, SearchForm} from "./components";
import {PRODUCTS_QUERY} from "./queries";
import {filter} from "../../_helpers";

import './index.css'

class ProductListPage extends React.PureComponent {

  static defaultProps = {
    title: "Products"
  };

  constructor(props) {
    super(props);
    // get categories from query string
    const {categories, min, max} = props.router.query;
    // set initial state
    this.state = {
      sideNavOpen: false,
      categories: categories || [],
      min: min || undefined,
      max: max || undefined
    }
  }

  toggleSideNav = () => {
    // toggle the side-nav by negating the state
    this.setState(
      {sideNavOpen: !this.state.sideNavOpen}
    )
  };

  updatePriceFilter = (min, max) => {
    this.setState({
      max: max,
      min: min
    })
  };

  updateCategoryFilter = (id, value) => {
    // get categories from state
    const {categories} = this.state;
    // check if category is in category list
    if (categories.find(category => id === category) !== undefined) {
      // check if the category flag is false(unchecked) or true(checked)
      if (!value) {
        // remove id from the list
        this.setState({
          categories: categories.filter((category) => category !== id)
        });
      }
    } else {
      // if category id not in state
      // add id to categories list
      this.setState({
        categories: categories.concat(id)
      })
    }
  };

  applyFilters = e => {
    // prevent default behaviour
    e.preventDefault();
    // call the filter function to push the filters to the url
    // get query
    let {router} = this.props;
    const {categories, min, max} = this.state;
    filter(router, {
      categories, min, max
    })
  };

  render() {
    // div Styling
    const divStyle = {
      marginLeft: (this.state.sideNavOpen) ? 300 : 0,
      transition: "margin-left .5s",
    };
    const {data: {loading, error, filterProducts}} = this.props;
    //const {query: {category}} = this.props.router;

    if (loading) return <MainLoader/>;
    if (error) return "Error";
    const {filterPrice: {min, max}, category} = filterProducts;

    const {name, description} = category || {name: "", description: ""};
    const displayFilter = !(Boolean(category) && (min === max));

    return (
      <>
        <NextSeo
          title={name || this.props.title}
          description={description}
        />
        <div className={"page overflow-hidden"}>
          <MDBContainer fluid>
            <SideNav toggleFunction={this.toggleSideNav} isOpen={this.state.sideNavOpen}>
              <div className={"h3 nav-link text-white text-capitalize text-center"}>Filters</div>
              <div className={"text-white w-100"}>
                <RangeSlider title={"Price"}
                             min={this.state.min}
                             max={this.state.max}
                             minPrice={min}
                             maxPrice={max}
                             step={1}
                             updateFilter={this.updatePriceFilter} data={this.props.data}/>
                <CategoryFilter data={this.props.data}
                                category={category}
                                updateFilter={this.updateCategoryFilter}
                                categories={this.state.categories}/>
                <div className={"text-center"}>
                  <MDBBtn outline
                          onClick={this.applyFilters}
                          className={"rounded-pill mx-auto my-5"}
                          style={{display: displayFilter ? "" : "none"}}>
                    <MDBIcon icon={"sliders-h"}/>
                    <span className={"mx-2"}>APPLY FILTERS</span>
                  </MDBBtn>
                </div>
              </div>
            </SideNav>
          </MDBContainer>
          <div style={divStyle} className={"sidenav-main"}>
            <MDBContainer>
              <h1 className={"text-center text-capitalize h-100"}>{name || "Products"}</h1>
              <SearchForm displayFilter={displayFilter} filterPrice={min !== max} toggleSideNav={this.toggleSideNav}/>
              <ProductView data={this.props.data}/>
            </MDBContainer>
          </div>
        </div>
      </>
    )
  }
}

const getVariables = props => {
  // get the categories and query from parsed query string object
  const {category, categories, query, max, min} = props.router.query;
  // return query variables
  return {
    slugs: category ? [category] : undefined,
    ids: categories || [],
    query: query,
    max: max,
    min: min
  }
};


export default withRouter(compose(
  graphql(
    PRODUCTS_QUERY,
    {
      options: props => ({variables: getVariables(props)})
    }
  )
)(ProductListPage));