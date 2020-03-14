import React from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {GoogleLogin} from 'react-google-login';
import InstagramLogin from 'react-instagram-login';
import {CLIENT_IDS, FACEBOOK_LOGIN_URL, GOOGLE_LOGIN_URL, INSTAGRAM_LOGIN_URL} from "../../../_constants";
import {loginErrors} from '../../../components/login/queries';
import {APP_QUERY} from "../../app/queries";

const {facebook, instagram, google} = CLIENT_IDS;

const refetchQueries = [
  {query: loginErrors},
  {query: APP_QUERY},
];

class SocialLogin extends React.PureComponent {
  responseGoogle = async response => {
    await this.props.socialLogin({
      variables: {
        url: GOOGLE_LOGIN_URL,
        accessToken: response.accessToken
      },
      refetchQueries: refetchQueries
    });
  };
  responseFacebook = async response => {
    await this.props.socialLogin({
      variables: {
        url: FACEBOOK_LOGIN_URL,
        accessToken: response.accessToken
      },
      refetchQueries: refetchQueries
    });
  };
  responseInstagram = async response => {
    await this.props.socialLogin({
      variables: {
        url: INSTAGRAM_LOGIN_URL,
        accessToken: response
      },
      refetchQueries: refetchQueries
    });
  };

  render() {
    return (
      <>
        <p className={"h3 text-center text-grey"}> Login with ...</p>
        <div className={"d-flex justify-content-center"}>
          <FacebookLogin
            appId={facebook}
            autoLoad={false}
            render={renderProps => (
              <MDBBtn onClick={renderProps.onClick} color={"transparent"} className={"rounded-pill"}>
                <MDBIcon size={"2x"} fab icon="facebook-f"/>
              </MDBBtn>
            )}
            callback={this.responseFacebook}/>
          <GoogleLogin
            clientId={google}
            render={renderProps => (
              <MDBBtn onClick={renderProps.onClick} color={"transparent"} disabled={renderProps.disabled}
                      className={"rounded-pill"}>
                <MDBIcon size={"2x"} fab icon="google"/>
              </MDBBtn>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <InstagramLogin
            implicitAuth={true}
            clientId={instagram}
            cssClass={"btn btn-md bg-transparent rounded-pill"}
            onSuccess={this.responseInstagram}
            onFailure={this.responseInstagram}
          >
            <MDBIcon size={"2x"} fab icon="instagram"/>
          </InstagramLogin>
        </div>
      </>
    )
  }
}


export default SocialLogin;