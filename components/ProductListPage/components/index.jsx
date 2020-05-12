import React from 'react'
import {MDBInput} from "mdbreact";
import SearchForm from "./SearchForm"

export class CategoryFilter extends React.Component {
  //define the state
  state = {};

  onChange = id => {
    // get current Value of id
    const currentValue = (this.state[id] === undefined) ? false : this.state[id];
    // negate the current Value
    let state = this.state;
    state[id] = !currentValue;
    // set state
    this.setState(state);
    // pass the data to higher components
    this.props.updateFilter(id, !currentValue);
  };

  render() {
    // if in category page render null
    if (this.props.category) return null;

    const {loading, error, allCategories} = this.props.data;
    // if loading return null
    if (loading) return null;

    // show error message
    if (error) return `Error! ${error.message}`;
    // get categories from categories state
    const categories = this.props.categories;

    // get a list of input elements from allCategories
    const categoryList = allCategories.map(
      (category, key) => {
        // check if category from server is in category from search parameters
        const defaultValue = !!categories.find(id => category.id === id);
        // return an input MDBInput component
        return <MDBInput key={key} label={category.name} onChange={e => this.onChange(e.target.id)}
                         type="checkbox"
                         checked={defaultValue}
                         id={category.id}/>
      }
    );
    return (
      <>
        <div className={"h4 nav-link text-light text-center"}>Categories</div>
        <div>
          {categoryList}
        </div>
      </>
    )
  }
}

export {SearchForm}