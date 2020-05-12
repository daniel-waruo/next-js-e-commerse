import React from 'react';

import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdbreact';

const errorFormat = (error, key) => (
  <div key={key} className={"invalid-feedback d-block"}>{error.message}</div>
);

export default function RegisterForm(props) {
  /*
  Props : registerErrors , register , onChange

  */

  // if errors show them
  let nonFieldErrors = [], emailErrors = [], usernameErrors = [], password1Errors = [], password2Errors = [];

  if (props.registerErrors) {
    props.registerErrors.forEach(
      error => {
        switch (error.field) {
          case "non_field_errors":
            nonFieldErrors.push(error);
            break;
          case "email" :
            emailErrors.push(error);
            break;
          case "username" :
            usernameErrors.push(error);
            break;
          case "password1":
            password1Errors.push(error);
            break;
          case "password2":
            password2Errors.push(error);
            break;
          default:
            break;
        }
      }
    )
  }
  // if user redirect home or next
  //TODO : implement next
  usernameErrors = !usernameErrors.length ? null : usernameErrors.map(errorFormat);
  emailErrors = !emailErrors.length ? null : emailErrors.map(errorFormat);
  password1Errors = !password1Errors.length ? null : password1Errors.map(errorFormat);
  password2Errors = !password2Errors.length ? null : password2Errors.map(errorFormat);
  return (
    <>
      <MDBContainer>
        <MDBRow className="justify-content-center my-auto">
          <MDBCol md="6" className={"rounded my-auto"}>
            <form onSubmit={props.register}>
              <h1 className="h1 text-center mb-4">Register</h1>
              <div className="grey-text">
                {usernameErrors}
                <MDBInput label="Type your User Name" icon="user" group type="text" validate error="wrong"
                          success="right" required onChange={e => props.onChange({username: e.target.value})}/>
                {emailErrors}
                <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                          success="right" required onChange={e => props.onChange({email: e.target.value})}/>
                {password1Errors}
                <MDBInput label="Type your password" icon="lock" group type="password" validate required
                          onChange={e => props.onChange({password1: e.target.value})}/>
                {password2Errors}
                <MDBInput label="Confirm Password" icon="lock" group type="password" validate required
                          onChange={e => props.onChange({password2: e.target.value})}/>
              </div>
              <div className="text-center">
                <MDBBtn type={"submit"}>Register</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}