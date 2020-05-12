import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import React from "react"
import {withRouter} from "next/router";

class SearchForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: props.router.query.query
    };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({value: e.target.value})
  };

  onSubmit = e => {
    e.preventDefault();
    // get query
    const query = this.state.value;
    this.props.router.push({
      pathname: '/products',
      query: {
        query: query
      }
    })
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <MDBRow center>
          <MDBCol size={"12"} md={"9"}>
            <MDBInput
              label="Search For Products Here"
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
          </MDBCol>
        </MDBRow>
      </form>
    )
  }
}

export default withRouter(SearchForm);