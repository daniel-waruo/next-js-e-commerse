import React from 'react'
import './index.css'

class SideNav extends React.Component {
  static defaultProps = {
    isOpen: false,
    toggleFunction: function () {
    },
  };

  render() {
    const className = this.props.className || "";
    const {hide} = this.props;
    const hideClass = hide ? `sidenav-hide-${hide}` : "";
    const classes = (this.props.isOpen) ? `sidenav-open ${hideClass}` : "";
    return (
      <>
        <div className={`sidenav  ${classes}  ${className}`}>
        <span className="closebtn px-4 z-depth-1 bg-warning text-white rounded-pill" style={{cursor: 'pointer'}}
              onClick={this.props.toggleFunction}>&times;</span>
          {this.props.children}
        </div>
      </>
    )
  }
}

class SideMenu extends React.Component {
  render() {
    const divStyling = {
      position: "relative",
    };
    return (
      <div className={"f-100 bg-dark"}>
      </div>
    )
  }
}

export {SideNav};