import React from 'react'
import {MDBDropdown, MDBDropdownMenu, MDBDropdownToggle} from "mdbreact";
import Link from 'next/link'

class UserInfoDropdown extends React.Component {

  render() {
    const user = this.props.user;
    const dropDownItems = () => {
      if (user !== null) {
        return (
          <>
            <Link href="/#">
              <a className={"dropdown-item"}>
                My account
              </a>
            </Link>
            <Link href={"#"} onClick={this.props.logout} to="#">
              <a className={"dropdown-item"}>
                Log out
              </a>
            </Link>
          </>)
      }
      return (
        <>
          <Link href={"/register"}>
            <a className={"dropdown-item"}>
              Register
            </a>
          </Link>
          <Link href={"/login"}>
            <a className={"dropdown-item"}>
              Log In
            </a>
          </Link>
        </>
      )
    };
    return (
      <MDBDropdown>
        <MDBDropdownToggle className="dropdown-toggle" nav>
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"
            className="rounded-circle z-depth-0"
            style={{height: "35px", padding: 0}}
            alt=""
          />
        </MDBDropdownToggle>
        <MDBDropdownMenu className="dropdown-default" style={{}}>
          {dropDownItems()}
        </MDBDropdownMenu>
      </MDBDropdown>
    )

  }
}

export default UserInfoDropdown;