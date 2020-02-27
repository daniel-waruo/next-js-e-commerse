import React from 'react';
import {style} from "./mainLoader.style";

class MainLoader extends React.Component {

  render() {
    //get a title value from the props
    let title = this.props.title;
    return (
      <>
        <style>{style}</style>
        <div className={"loader-bg white animated show " + this.props.className} id="loader-background">
          <div className="loader">
            <div className="load_base load1">
              <div className="load_base out_loader"/>
            </div>
            <div className="load_base load2">
              <div className="load_base in_loader in_loader1"/>
              <div className="load_base in_loader in_loader2"/>
              <div className="load_base in_loader in_loader3"/>
              <div className="load_base in_loader in_loader4"/>
            </div>
          </div>
          <div className="background">
            <span>{title}</span>
            <div className="background_marge_title"/>
          </div>
        </div>
      </>
    )
  }
}

function hideLoader(id) {
  let loader = document.getElementById(id);
  setTimeout(() => {
    loader.classList.add("d-none");
  }, 2000);
}

function showLoader(id) {
  let loader = document.getElementById(id);
  if (loader !== null) {
    loader.classList.remove("d-none")
  }
}

export default MainLoader;
export {MainLoader, hideLoader, showLoader};

