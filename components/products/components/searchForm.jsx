import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import React from "react"
import {withRouter} from "next/router";

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
    let {query} = this.props.router;
    query.query = this.state.value;
    this.props.router.push({
      pathname: "/products",
      query: query
    })
  };

  render() {
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
          <MDBCol size={"12"} md={"9"}>
            <MDBBtn outline type={"submit"} color={"primary"}>
              <MDBIcon icon={"search"}/>
              <span className={"mx-2"}>Search</span>
            </MDBBtn>
            <MDBBtn outline onClick={this.props.toggleSideNav} color={"secondary"}>
              <MDBIcon icon={"sliders-h"}/>
              <span className={"mx-2"}>Filter</span>
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    )
  }
}

export default withRouter(SearchForm);