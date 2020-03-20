import React from 'react'
import {AccountCard, AccountSideNav} from './components'
import {MDBCol, MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import {userQuery} from "./queries";
import SpinnerLoader from "../global/loaders/spinnerLoader";

class Account extends React.Component {
  state = {
    isOpen: false,
  };
  toggleFunction = () => {
    const {isOpen} = this.state;
    return this.setState({isOpen: !isOpen})
  };

  render() {
    const listClass = "border border-0";
    const {
      data: {
        loading,
        error,
        user
      }
    } = this.props;
    if (loading) return <SpinnerLoader/>;

    if (error) return null;
    const {email, firstName, lastName} = user;
    const fullName = `${firstName} ${lastName}`;
    return (
      <>
        <div className={"mx-2"}>
          <MDBRow>
            <MDBCol md={"3"} className={"d-none d-md-block"}>
              <MDBContainer className={"z-depth-1 px-0"}>
                <AccountSideNav isOpen={this.state.isOpen} width={400}>
                  <MDBListGroup>
                    <MDBListGroupItem active hover className={listClass}>
                      <MDBIcon far icon={"user"} className={"mr-2"}/>
                      My Account
                    </MDBListGroupItem>
                    <MDBListGroupItem hover className={listClass}>
                      <MDBIcon fas icon={"clipboard-list"} className={"mr-2"}/>
                      Orders
                    </MDBListGroupItem>
                    <MDBListGroupItem hover className={listClass}>
                      <MDBIcon fas icon={"user-edit"} className={"mr-2"}/>
                      Edit Account Info
                    </MDBListGroupItem>
                    <MDBListGroupItem hover className={listClass}>
                      <MDBIcon fas icon={"address-book"} className={"mr-2"}/>
                      Address Book
                    </MDBListGroupItem>
                    <MDBListGroupItem hover className={listClass}>
                      <MDBIcon fas icon={"link"} className={"mr-2"}/>
                      Linked Accounts
                    </MDBListGroupItem>
                  </MDBListGroup>
                </AccountSideNav>
              </MDBContainer>
            </MDBCol>
            <MDBCol size={"12"} md={"9"}>
              <MDBContainer className={"z-depth-1 f-85"}>
                <h1 className={"text-center text-bold"}>Account Overview</h1>
                <MDBRow center>
                  <MDBCol size={"12"} md={"6"} className={"my-3"}>
                    <AccountCard title={"User Details"} className={"z-depth-half m-2 h-100"}>
                      <p className={"px-2 h5"}>{fullName}</p>
                      <p className={"px-2"}>{email}</p>
                    </AccountCard>
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"} className={"my-3"}>
                    <AccountCard title={"Address Book"} className={"z-depth-half m-2 h-100"}>
                      <p className={"px-2 h5"}>
                        Your default shipping address:
                      </p>
                      <p className={"px-2"}>
                        {fullName}
                        <br/>
                        Opposite Haven Hospital Ruai
                        <br/>
                        Mihango / Njiru / Chokaa / Ruai / Kamulu, Nairobi
                        <br/>
                        +254 797792447
                      </p>
                    </AccountCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </div>
      </>
    )
  }
}

export default graphql(
  userQuery
)(Account);