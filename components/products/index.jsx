import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {PRODUCTS_QUERY} from "./queries";
import React from 'react'
import {MDBBtn, MDBContainer} from 'mdbreact'
import './index.css'
import {ProductView, RangeSlider, SideNav, SpinnerLoader} from "../../components/global"
import {graphql} from "react-apollo";
import {CategoryFilter, SearchForm} from "./components";
import {NextSeo} from 'next-seo';

class ProductsPage extends React.Component {
  static defaultProps = {
    title: "Products"
  };

  constructor(props) {
    super(props);
    // get categories from query string
    const {categories} = props.router.query;
    // set initial state
    this.state = {
      sideNavOpen: false,
      categories: categories || [],
      price: {
        min: undefined,
        max: undefined
      }
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
      price: {
        max: max,
        min: min
      }
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
    let {query} = this.props.router;
    const {categories, price: {min, max}} = this.state;
    query.categories = categories;

    if (min !== undefined || max !== undefined) {
      query.maxPrice = max;
      query.minPrice = min;
    }
    this.props.router.push({
      pathname: "/products",
      query: query
    })
  };

  render() {
    // div Styling
    const divStyle = {
      marginLeft: (this.state.sideNavOpen) ? 300 : 0,
      transition: "margin-left .5s",
    };
    const {data: {loading, error, filterProducts}} = this.props;
    const {query: {category}} = this.props.router;

    if (loading) return <SpinnerLoader/>;
    if (error) return "Error";
    const {filterPrice: {min, max}} = filterProducts;

    const CategoryProductFilterMessage = category ? "Category Filter Products Not Available" : null;
    return (
      <>
        <NextSeo title={category || this.props.title}/>
        <div className={"page overflow-hidden"}>
          <MDBContainer fluid>
            <SideNav toggleFunction={this.toggleSideNav} isOpen={this.state.sideNavOpen}>
              <div className={"h3 nav-link text-white text-capitalize text-center"}>Filters</div>
              <div className={"text-white w-100"}>
                <RangeSlider title={"Price"} min={min} max={max} minPrice={min} maxPrice={max} step={1}
                             updateFilter={this.updatePriceFilter} data={this.props.data}/>
                <CategoryFilter data={this.props.data}
                                category={category}
                                updateFilter={this.updateCategoryFilter}
                                categories={this.state.categories}/>
                <div className={"text-center"}>
                  {CategoryProductFilterMessage}
                  <MDBBtn outline
                          onClick={this.applyFilters}
                          className={"rounded-pill mx-auto my-5"}
                          style={{display: category ? "none" : "block"}}>
                    APPLY FILTERS
                  </MDBBtn>
                </div>
              </div>
            </SideNav>
          </MDBContainer>
          <div style={divStyle} className={"sidenav-main"}>
            <MDBContainer>
              <h1 className={"text-center text-capitalize h-100"}>{category || "Products"}</h1>
              <SearchForm toggleSideNav={this.toggleSideNav}/>
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
  const {category, categories, query, maxPrice, minPrice} = props.router.query;
  // return query variables
  return {
    slugs: category ? [category] : undefined,
    ids: categories || [],
    query: query,
    maxPrice: maxPrice,
    minPrice: minPrice
  }
};


export default withRouter(compose(
  graphql(
    PRODUCTS_QUERY,
    {
      options: props => ({variables: getVariables(props)})
    }
  )
)(ProductsPage));