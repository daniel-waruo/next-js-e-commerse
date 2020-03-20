import React from 'react'
import {AccountCard, AccountSideNav} from './components'
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact'
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
            <AccountSideNav toggleFunction={this.toggleFunction}
                            isOpen={this.state.isOpen}
                            active={"account"}
                            className={"z-depth-1 px-0"}/>
            <MDBCol size={"12"} lg={"9"}>
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