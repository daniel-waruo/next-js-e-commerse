import React from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {NextSeo} from "next-seo"
import "./account-layout.css"
import {AccountSideNav} from "./AccountSideNav";

export class AccountLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false
    }
  }

  toggleFunction = () => {
    const {isOpen} = this.state;
    return this.setState({isOpen: !isOpen})
  };

  render() {
    const {active, title} = this.props;
    return (
      <>
        <NextSeo title={title} nofollow={true}/>
        <div className={"mx-2"}>
          <MDBRow>
            <AccountSideNav toggleFunction={this.toggleFunction}
                            isOpen={this.state.isOpen}
                            active={active}
                            className={"z-depth-1 px-0"}/>
            <MDBCol size={"12"} lg={"9"}>
              <MDBContainer className={"z-depth-1 f-85-no-mobile"}>
                {this.props.children}
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </div>
      </>
    )
  }
}