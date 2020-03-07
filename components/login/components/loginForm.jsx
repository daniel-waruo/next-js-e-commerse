import React from 'react';
import {MDBAlert, MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from 'mdbreact';
import SocialLogin from './socialLogin'

export default function LoginForm(props) {
  /*
  Props : onChange : Func , login : Func, loginErrors :  ,
  */

  const nonFieldErrors = () => {
    if (props.loginErrors) {
      return props.loginErrors.map(
        (error, key) => (
          <MDBAlert key={key}>{error.message}</MDBAlert>
        )
      )
    }
    return null
  };
  console.log(props);
  return (
    <>
      <MDBContainer>
        {nonFieldErrors()}
        <MDBRow>
          <MDBCol md="6" className={"rounded m-auto"}>
            <div className={"rounded z-depth-1 p-3"}>
              <SocialLogin socialLogin={props.socialLogin}/>
              <form onSubmit={props.login}>
                <p className="h1 text-center mb-4 grey-text">Log in </p>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    required
                    onChange={e => {
                      props.onChange({email: e.target.value})
                    }}
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    required
                    onChange={e => {
                      props.onChange({password: e.target.value})
                    }}
                  />
                </div>
                <div className="text-center">
                  <MDBBtn type="submit" className={"rounded-pill w-100 "}>
                    <span className={"h5"}>Login</span>
                    <MDBIcon size={"2x"} className={"mx-4"} icon="sign-in-alt"/>
                  </MDBBtn>
                </div>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}