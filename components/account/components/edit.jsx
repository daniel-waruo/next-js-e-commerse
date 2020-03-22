import React from "react"
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";

const UserEditField = (props) => {

  const {label, type, onChange, initial} = props;

  return (
    <MDBCol size={"12"} md={"6"} className={"my-4-no-mobile"}>
      <MDBInput valueDefault={initial} label={label} type={type} onChange={onChange}/>
    </MDBCol>
  )
};

const ButtonLoader = props => {
  const {width, height} = props;
  const style = {
    width, height
  };
  return (
    <div className="spinner-border text-primary float-left" style={style} role="status">
      <span className="sr-only">
        Loading...
      </span>
    </div>
  )
};


const FormButton = props => {
  // change state when props is loading
  const {loading} = props;
  const loader = loading ? <ButtonLoader/> : null;
  return (
    <MDBBtn disabled={loading} outline type={"submit"} color={"primary"} className={"w-100 rounded-pill"}>
      SAVE {loader}
    </MDBBtn>
  )
};

export class UserEditForm extends React.Component {
  constructor(props) {
    super(props);
    const {user: {firstName, lastName, email}} = props;
    this.state = {
      firstName,
      lastName,
      email,
      loading: false
    }
  }

  changeState = (field, value) => {
    const state = this.state;
    state[field] = value;
    this.setState(state)
  };
  onSubmit = e => {

    // prevent default submit action
    e.preventDefault();
    // show loading state
    this.setState({loading: true});
    //call mutation and place the variables in the state
    this.props.editUserInformation(
      {variables: this.state}
    ).then((data) => {

        console.log(data);
        // set state of loader as false
        this.setState({loading: false})
      }
    ).catch((res) => {
        const errors = res.graphQLErrors.map(
          error => {
            JSON.parse(error)
          }
        );
        console.log(errors);
        // set state of loader as false
        this.setState({loading: false})
      }
    )
    // this.props.editUserInformation(this.state)
  };

  render() {
    const {
      user: {firstName, lastName, email}
    } = this.props;
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <MDBContainer>
            <MDBRow center>
              <UserEditField
                label={"First Name"}
                type={"text"}
                initial={firstName}
                onChange={(e) => this.changeState("firstName", e.target.value)}/>
              <UserEditField
                label={"Last Name"}
                type={"text"}
                initial={lastName}
                onChange={(e) => this.changeState("lastName", e.target.value)}/>
              <UserEditField
                label={"Email"}
                type={"email"}
                initial={email}
                onChange={(e) => this.changeState("email", e.target.value)}/>
              <UserEditField
                label={"Phone Number"}
                type={"text"}
                onChange={(e) => this.changeState("phoneNumber", e.target.value)}/>
              <FormButton loading={this.state.loading}/>
            </MDBRow>
          </MDBContainer>
        </form>
      </>
    )
  }
}