import React from 'react'
import {MDBBtn, MDBContainer} from 'mdbreact'
import './index.css'
import {ProductView, RangeSlider, SideNav} from "../../components/global"
import {PRODUCTS_QUERY} from '../../components/products/queries'
import compose from 'lodash.flowright';
import {graphql} from "react-apollo";
import {CategoryFilter, SearchForm} from "../../components/products/components";
import {withRouter} from "next/router"
import {withApp} from "../../components/app/index";
import {withApollo} from "../../lib/apollo";

class ProductsPage extends React.Component {

  constructor(props) {
    super(props);
    // get categories from query string
    const {categories} = props.router.query;
    // set initial state
    this.state = {
      sideNavOpen: false,
      categories: categories || [],
    }
  }

  toggleSideNav = () => {
    // toggle the side-nav by negating the state
    this.setState(
      {sideNavOpen: !this.state.sideNavOpen}
    )
  };

  updateFilter = (id, value) => {
    // get categories from state
    const {categories} = this.state;
    // check if category is in category list
    if (categories.find(category => id === category) !== undefined) {
      // check if the category flag is false(unchecked) or true(checked)
      if (!value) {
        // remove id from the list
        this.setState({
          categories: categories.filter((category, index, arr) => category !== id)
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
    query.categories = this.state.categories;
    this.props.router.push({
      pathname: "/products",
      query: query
    })
    //filter(this.props.history, this.props.location, this.state.categories)
  };

  render() {
    // div Styling
    const divStyle = {
      marginLeft: (this.state.sideNavOpen) ? 250 : 0,
      transition: "margin-left .5s",
    };
    return (
      <div className={"page"}>
        <MDBContainer fluid>
          <SideNav toggleFunction={this.toggleSideNav} isOpen={this.state.sideNavOpen}>
            <div className={"h3 nav-link text-white text-center"}>Filters</div>
            <div className={"text-white"}>
              <RangeSlider title={"Price"} min={1} max={10} step={1}/>
              <CategoryFilter data={this.props.data} updateFilter={this.updateFilter}
                              categories={this.state.categories}/>
              <MDBBtn style={{bottom: 0}} onClick={this.applyFilters} className={"fixed-bottom"}>APPLY FILTERS</MDBBtn>
            </div>
          </SideNav>
        </MDBContainer>
        <div style={divStyle} className={"sidenav-main"}>
          <MDBContainer>
            <h1 className={"text-center h-100"}>Products</h1>
            <SearchForm toggleSideNav={this.toggleSideNav}/>
            <ProductView data={this.props.data}/>
          </MDBContainer>
        </div>
      </div>
    )
  }
}

const getVariables = props => {
  // get the categories and query from parsed query string object
  const {categories, query} = props.router.query;
  // return query variables
  return {
    ids: categories || [],
    query: query
  }
};


export default withApollo()(withApp(
  withRouter(compose(
    graphql(
      PRODUCTS_QUERY,
      {
        options: props => ({variables: getVariables(props)})
      }
    )
  )(ProductsPage))
));