import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import React from "react"
import {withRouter} from "next/router";
import {filter} from "../../../_helpers";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    const {query} = props.router.query;
    this.state = {
      value: query
    };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({value: e.target.value})
  };

  onSubmit = e => {
    e.preventDefault();
    // get query
    let {router} = this.props;
    filter(router, {
      query: this.state.value
    })
  };

  render() {
    const {displayFilter} = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <MDBRow center>
          <MDBCol size={"12"} md={"9"}>
            <MDBInput
              label="Search Here"
              icon="search"
              group
              validate
              required
              error="wrong"
              success="right"
              onChange={this.onChange}
              valueDefault={this.state.value}
            />
          </MDBCol>
          <MDBCol size={"12"} md={"9"} className={"text-center"}>
            <MDBBtn
              outline
              onClick={this.props.toggleSideNav}
              style={{display: displayFilter ? "" : "none"}}
              className={"rounded-pill"}>
              <MDBIcon icon={"filter"}/>
              <span className={"mx-2"}>Filters</span>
            </MDBBtn>
            <MDBBtn outline type={"submit"} color={"primary"} className={"rounded-pill"}>
              <MDBIcon icon={"search"}/>
              <span className={"mx-2"}>Search</span>
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    )
  }
}

export default withRouter(SearchForm);