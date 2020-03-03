import React from 'react';
import {MDBAlert, MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdbreact';

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
  return (
    <>
      <MDBContainer>
        {nonFieldErrors()}
        <MDBRow className="f-85">
          <MDBCol md="6" className={"rounded m-auto"}>
            <form onSubmit={props.login}>
              <p className="h1 text-center mb-4">Log in</p>
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
                  className={'is-invalid'}
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
                <MDBBtn type="submit">Login</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}