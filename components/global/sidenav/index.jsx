import React from 'react'
import styling from './index.style'

class SideNav extends React.Component {
  static defaultProps = {
    isOpen: false,
    toggleFunction: function () {
    },
  };

  render() {
    const className = this.props.className || "";
    const classes = (this.props.isOpen) ? "sidenav-open" : "";
    return (
      <>
        <style>{styling({width: 300})}</style>
        <div className={`sidenav  ${classes}  ${className}`}>
        <span className="closebtn border border-black px-3 z-depth-1 bg-warning text-white" style={{cursor: 'pointer'}}
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