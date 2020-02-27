import React from 'react';
import MenuLink from "./menuLink";
import {MDBBtn, MDBCol, MDBCollapse, MDBIcon} from "mdbreact";

class CategoryMenuLinks extends React.Component {
  constructor(props) {
    super(props);
    // set the initial state of collapse based on the current window size
    this.state = {
      collapseOpen: true
    }
  }

  toggleOpen = () => {
    this.setState(
      {collapseOpen: !this.state.collapseOpen}
    );
  };//toggle the state of the collapse depending on the size of the screen

  handleResize = () => {
    if (this.props.windowWidth <= 977) {
      console.log(this.props.windowWidth);
      if (this.state.collapseOpen === true) {
        this.setState(
          {"collapseOpen": false}
        )
      }
    }
    else {
      if (this.state.collapseOpen === false) {
        this.setState(
          {"collapseOpen": true}
        )
      }
    }
  };// if the size of the window is less than md close the collapse else open the

  render() {
    // get the category objects passed in the props
    let categories = this.props.categories,
      //create a menu links for every object in categoryLinks
      categoryLinks = categories.map(
        (category, index) =>
          <MenuLink key={index} id={category.id} title={category.name}/>
      );
    // get the fixed height the category link if none display not considering overflow
    let heightClass = this.props.heightClass,
      listClasses = "list-unstyled example-components-list";
    if (heightClass)
      listClasses += listClasses + heightClass + "overflow-auto";
    return (
      <>
        <MDBCol
          lg="3"
          className="mx-auto white px-2">
          <ul className={listClasses}>
            <MDBBtn
              className="btn col-12 d-md-block d-lg-none"
              color="white"
              onClick={this.toggleOpen}
            >
              <span className={"h3"}>Categories</span>
              <br/>
              <MDBIcon icon="plus-circle" size="lg"/>
            </MDBBtn>
            <MDBCollapse
              id="categoryMenuCollapse"
              isOpen={this.state.collapseOpen}>
              <div>
                <h3 className="text-dark d-none d-lg-block">CATEGORIES</h3>
                {categoryLinks}
              </div>
            </MDBCollapse>
          </ul>
        </MDBCol>
      </>
    )
  }
}

export default CategoryMenuLinks;
