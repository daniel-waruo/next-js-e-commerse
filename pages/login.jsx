import React from 'react';
import Router from 'next/router';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {SpinnerLoader} from "../components/global/index";
import {LoginForm} from "../components/login/components";
import {login, loginErrors, socialLogin} from '../components/login/queries';
import {APP_QUERY} from '../components/app/queries';
import {withApp} from '../components/app/index';
import {withApollo} from "../lib/apollo";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = object => {
    this.setState(object)
  };

  login = event => {
    // prevent default submit behaviour
    event.preventDefault();
    // run the login mutation
    this.props.login({
      variables: this.state,
      refetchQueries: [
        {query: APP_QUERY}
      ],
    })
  };

  render() {
    console.log(this.props);
    // get loginErrors and the user from the props
    const {data: {loginErrors, user}, loading} = this.props;
    // if still loading show spinner loader
    if (loading) return <SpinnerLoader/>;

    // if user redirect to  redirect home or next 
    //TODO : implement next 
    if (user) {
      // redirect to home if there is user
      Router.push('/')
    }
    // return login form for rendering 

    return (
      <div className={"page"}>
        <LoginForm onChange={this.onChange}
                   socialLogin={this.props.socialLogin}
                   login={this.login}
                   loginErrors={loginErrors}
                   loading={false} />
      </div>
    )
  }
}

export default withApollo()(
  withApp(
    compose(
      graphql(loginErrors),
      graphql(login, {name: 'login'}),
      graphql(socialLogin, {name: 'socialLogin'})
    )(Login))
);
