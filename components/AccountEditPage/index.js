import React from 'react';
import compose from 'lodash.flowright';
import {graphql} from 'react-apollo';
import {MDBAlert} from "mdbreact";

import {AccountLayout} from '../AccountLayout';
import {UserEditForm} from './AccountEditForm';
import {addMessageMutation, userEditMutation, userQuery} from './queries';
import MainLoader from '../MainLoader';


class AccountEditPage extends React.Component {
  render() {
    const {
      data: {loading, error, user, messages}
    } = this.props;

    if (loading) return <MainLoader/>;

    if (error) return null;

    const pageMessages = messages ? messages.map(
      ({type, text}, key) => {
        return (
          <MDBAlert key={key} color={type} className={"text-center"}>
            {text}
          </MDBAlert>
        )
      }
    ) : null;

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
)(AccountEditPage);
