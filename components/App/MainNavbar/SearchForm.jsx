import React from 'react';
import {MDBCollapse, MDBIcon, MDBInput, MDBNavbarNav} from "mdbreact";
import Router from "next/router";

class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      collapseOpen: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    // set state
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // prevent default submit action
    event.preventDefault();
    // call search function
    Router.push({
      pathname: "/products",
      query: {
        query: this.state.value
      }
    });
  }

  toggleSearch = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  handleResize = () => {
    if (this.props.windowWidth >= 977 && this.props.windowWidth <= 1100) {
      if (this.state.collapseOpen === true) {
        this.setState(
          {collapseOpen: false}
        )
      }
    }
    else {
      if (this.state.collapseOpen === false) {
        this.setState(
          {collapseOpen: true}
        )
      }
    }
  };

  render() {
    return (
      <MDBNavbarNav left>
        <form onSubmit={this.handleSubmit} className="nav-item form-inline">
          <MDBCollapse
            id={"searchFormCollapse"}
            isOpen={this.state.collapseOpen}
          >
            <MDBInput
              containerClass="my-1"
              label="Search for Products"
              arialabel="Search for Products"
              onChange={this.handleChange}
              validate
              required
              value={this.state.value}
            />
          </MDBCollapse>
          <MDBIcon icon="search" className={"hoverable"} onClick={this.toggleSearch}>
          </MDBIcon>
        </form>
      </MDBNavbarNav>
    );
  }
}

export default SearchForm