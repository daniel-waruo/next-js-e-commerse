import React from 'react'
import styling from './index.style'

class SideNav extends React.Component {
  static defaultProps = {
    isOpen: false,
    toggleFunction: function () {
    },
  };

  render() {
    const classes = (this.props.isOpen) ? "sidenav-open" : "";
    return (
      <>
        <style>{styling}</style>
        <div className={"sidenav " + classes}>
        <span className="closebtn" style={{color: "white", cursor: 'pointer'}}
              onClick={this.props.toggleFunction}>&times;</span>
          {this.props.children}
        </div>
      </>
    )
  }
}
class SideMenu extends React.Component{
  render(){
    const divStyling = {
      position:"relative",
    };
    return (
      <div className={"f-100 bg-dark"}>
      </div>
    )
  }
}
export {SideNav};