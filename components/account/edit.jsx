import React from "react";
import {AccountLayout, redirectNoUser} from "./components";
import {UserEditForm} from "./components/edit";
import {addMessageMutation, userEditMutation, userQuery,messageQuery} from "./queries";
import {graphql} from "react-apollo";
import SpinnerLoader from "../global/loaders/spinnerLoader";
import compose from 'lodash.flowright'
import {MDBAlert} from "mdbreact";

class AccountEdit extends React.Component {
  render() {
    const {
      data: {
        loading,
        error,
        user,
        messages
      }
    } = this.props;

    if (loading) return <SpinnerLoader/>;

    if (error) return null;

    if (!user) return redirectNoUser();

    const pageMessages = messages ?  messages.map(
      ({type,text},key)=>{
        return (
          <MDBAlert key={key} color={type} className={"text-center"}>
            {text}
          </MDBAlert>
        )
      }
    ) : null ;

    return (
      <AccountLayout user={user} active={"account_edit"} title={"Edit Account Information"}>
        <h1 className={"text-center"}>Edit Account Information</h1>
        {pageMessages}
        <UserEditForm
          user={user}
          addMessage={this.props.addMessage}
          editUserInformation={this.props.editUserInformation}/>
      </AccountLayout>
    )
  }
}

export default compose(
  graphql(userQuery),
  graphql(userEditMutation, {name: 'editUserInformation'}),
  graphql(addMessageMutation, {name: 'addMessage'}),
)(AccountEdit);
