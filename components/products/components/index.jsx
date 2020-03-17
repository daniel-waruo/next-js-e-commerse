import React from 'react'
import {MDBInput} from "mdbreact";
import SearchForm from "./searchForm"

export class CategoryFilter extends React.Component {
  //define the state
  state = {};

  onChange = id => {
    // get current Value of id
    const currentValue = (this.state[id] === undefined) ? false : this.state[id];
    // negate the current Value
    let state = this.state;
    state[id] = !currentValue;

    this.setState(state);
    // pass the data to higher components
    this.props.updateFilter(id, !currentValue);
  };

  render() {
    if (this.props.category) return null;
    const {loading, error, allCategories} = this.props.data;
    if (loading) return null;

    if (error) return `Error! ${error.message}`;
    const categories = this.props.categories;

    const categoryList = allCategories.map(
      (category, key) => {
        const defaultValue = !!categories.find(id => category.id === id);

        return <MDBInput key={key} label={category.name} onChange={e => this.onChange(e.target.id)}
                         type="checkbox"
                         checked={defaultValue}
                         id={category.id}/>
      }
    );
    return (
      <>
        <div className={"h4 nav-link text-light "}>Categories</div>
        <div>
          {categoryList}
        </div>
      </>
    )
  }
}

export {SearchForm}