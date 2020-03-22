import React from "react";
import {AccountLayout, redirectNoUser} from "./components";
import {UserEditForm} from "./components/edit";
import {userEditMutation, userQuery} from "./queries";
import {graphql} from "react-apollo";
import SpinnerLoader from "../global/loaders/spinnerLoader";
import compose from 'lodash.flowright'

class AccountEdit extends React.Component {
  render() {
    const {
      data: {
        loading,
        error,
        user
      }
    } = this.props;
    console.log(this.props);
    if (loading) return <SpinnerLoader/>;

    if (error) return null;

    if (!user) return redirectNoUser();

    return (
      <AccountLayout user={user} active={"account_edit"} title={"Edit Account Information"}>
        <h1 className={"text-center"}>Edit Account Information</h1>
        <UserEditForm user={user} editUserInformation={this.props.editUserInformation}/>
      </AccountLayout>
    )
  }
}

export default compose(
  graphql(userQuery),
  graphql(userEditMutation, {name: 'editUserInformation'})
)(AccountEdit);
