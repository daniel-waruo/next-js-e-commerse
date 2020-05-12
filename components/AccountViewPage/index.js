import React from 'react'
import {AccountCard} from './components'
import {AccountLayout} from "../AccountLayout";
import {MDBCol, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import {userQuery} from "./queries";
import MainLoader from "../MainLoader";
import Router from "next/router"

class AccountViewPage extends React.PureComponent {

  render() {
    const {
      data: {
        loading,
        error,
        user
      }
    } = this.props;
    if (loading) return <MainLoader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return null;

    // if user is null redirect to login page
    if (!user) return Router.push("/login");

    const {email, firstName, lastName} = user;
    const fullName = `${firstName} ${lastName}`;

    return (
      <AccountLayout user={user} active={"account"} title={"My Account"}>
        <h1 className={"text-center text-bold"}>Account Overview</h1>
        <MDBRow center>
          <MDBCol size={"12"} md={"6"} className={"my-3"}>
            <AccountCard href={"/account/edit"} title={"User Details"} className={"z-depth-half m-2 h-100"}>
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
      </AccountLayout>
    )
  }
}

export default graphql(
  userQuery
)(AccountViewPage);