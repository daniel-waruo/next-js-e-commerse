import React from "react";
import {NextSeo} from 'next-seo'
import {graphql} from "react-apollo";
import compose from "lodash.flowright";

import MainLoader from "../MainLoader";
import RegisterForm from './RegisterForm';
import {register, registerErrors} from "./queries";

class RegisterPage extends React.PureComponent {
  state = {
    email: '',
    username: '',
    password1: '',
    password2: '',
    success: false
  };
  register = e => {
    // event prevent default
    e.preventDefault();
    this.props.register({variables: this.state}).then(
      success => {
        if (success) {
          this.setState({success: success});
        }
      }
    );
  };

  onChange = object => {
    this.setState(object);
  };

  render() {
    // get loginErrors and the user from the props
    const {data: {registerErrors, user}, loading} = this.props;

    if (loading) return <MainLoader/>;

    return (
      <>
        <NextSeo title={"Register"}/>
        <div className={"page"}>
          <RegisterForm onChange={this.onChange} register={this.register} registerErrors={registerErrors}/>
        </div>
      </>
    )
  }
}

export default compose(
  graphql(registerErrors),
  graphql(register, {name: 'register'})
)(RegisterPage);
