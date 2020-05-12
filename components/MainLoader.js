import React from "react";

export default class MainLoader extends React.PureComponent {
  render() {
    const style = {
      position: "fixed",
      top: "calc( 50% - ( 61px / 2) )",
      bottom: "calc( 50% - ( 61px / 2) )"
    };
    return (
      <div className={"d-flex justify-content-center h-100"}>
        <div className="spinner-border text-primary" style={style} role="status">
          <span className="sr-only">
            Loading...
          </span>
        </div>
      </div>
    );
  }
}
