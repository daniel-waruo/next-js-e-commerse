import React from "react";
import {SpinnerLoader} from "../../components/global/index";
import {Redirect} from 'react-router-dom';

import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {RegisterForm} from '../../components/register/components';
import {register, registerErrors} from '../../components/register/queries'

import {withApp} from "../../components/app/index";
import {withApollo} from "../../lib/apollo";


class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password1: '',
      password2: '',
      success: false
    }
  }

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
    if (loading) return <SpinnerLoader/>;

    if (this.state.success) {
      return <Redirect to={"/login"}/>
    }
    if (user) {
      return <Redirect to={"/"}/>
    }
    return (
      <div className={"page"}>
        <RegisterForm onChange={this.onChange} register={this.register} registerErrors={registerErrors}/>
      </div>)
  }
}


export default withApollo()(withApp(
  compose(
    graphql(registerErrors),
    graphql(register, {name: 'register'})
  )(Register)
));