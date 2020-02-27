import React from 'react';
import {Redirect} from 'react-router-dom';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {SpinnerLoader} from "../../components/global/index";
import {LoginForm} from "../../components/login/components";
import {login, loginErrors} from '../../components/login/queries';
import {APP_QUERY} from '../../components/app/queries'
import {withApp} from '../../components/app/index'

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
    // get loginErrors and the user from the props
    const {data: {loginErrors, user}, loading} = this.props;
    // if still loading show spinner loader
    if (loading) return <SpinnerLoader/>;

    // if user redirect to  redirect home or next 
    //TODO : implement next 
    if (user) {
      // redirect to home if there is user
      return <Redirect to={"/"}/>
    }
    // return login form for rendering 

    return (
      <div className={"page"}>
        <LoginForm onChange={this.onChange} login={this.login} loginErrors={loginErrors} loading={false}/>
      </div>
    )
  }
}

const withApollo = compose(
  graphql(loginErrors),
  graphql(login, {name: 'login'})
);

export default withApp({ssr:false})(
  withApollo(Login)
);
