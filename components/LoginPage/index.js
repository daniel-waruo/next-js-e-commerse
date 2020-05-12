import React from "react";
import {APP_QUERY} from "../App/queries";
import Router from "next/router";
import {login, loginErrors, socialLogin} from "./queries";
import {graphql} from "react-apollo";
import compose from "lodash.flowright";
import MainLoader from "../MainLoader"
import {NextSeo} from "next-seo"
import {LoginForm} from "./components"

class LoginPage extends React.PureComponent {
  state = {
    email: '',
    password: ''
  };

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
    if (loading) return <MainLoader/>;

    // if user redirect to  redirect home or next
    //TODO : implement next
    if (user && typeof window !== "undefined") {
      // redirect to home if there is user
      Router.push('/')
    }
    // return login form for rendering

    return (
      <>
        <NextSeo
          title={"Login"}
          description={
            "Login into Next JS E-commerce using our secure social login feature." +
            "Login through FaceBook , Google and Instagram"
          }
        />
        <div className={"page"}>
          <LoginForm onChange={this.onChange}
                     socialLogin={this.props.socialLogin}
                     login={this.login}
                     loginErrors={loginErrors}
                     loading={false}/>
        </div>
      </>
    )
  }
}

export default compose(
  graphql(loginErrors),
  graphql(login, {name: 'login'}),
  graphql(socialLogin, {name: 'socialLogin'})
)(LoginPage)
