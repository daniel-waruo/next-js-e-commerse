import React from "react";
import {MDBBtn, MDBIcon, MDBTooltip} from "mdbreact";
import PropType from "prop-types";

export class Stepper extends React.Component {
  render() {
    return (
      <div className="steps-form-2">
        <div className="steps-row-2 setup-panel-2 d-flex justify-content-between">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export class Step extends React.Component {
  clickHandler = () => {
    this.props.setActive(this.props.idFor);
  }

  render() {
    const {idFor, icon, iconClass, title, btnColor, active} = this.props;

    return (
      <>
        <div className={"py-2"}>
          <MDBTooltip
            domElement
            tag="div"
            placement="top">
            <div className="steps-step-2" onClick={this.clickHandler}>
              <MDBBtn className={`btn-circle-2 mx-0 btn-${btnColor}`}>
                <MDBIcon icon={`${icon}`} className={iconClass}/>
              </MDBBtn>
            </div>
            <span>{`${title}`}</span>
          </MDBTooltip>
        </div>
      </>
    );
  }
}

Step.propTypes = {
  'idFor': PropType.string.isRequired,
  'icon': PropType.string.isRequired,
  'iconClass': PropType.string,
  'title': PropType.string.isRequired,
  'activeStepper': PropType.string.isRequired,
  'setActive': PropType.func.isRequired
}

export class StepperContent extends React.Component {
  render() {
    const {id, activeStepper} = this.props;
    if (id !== activeStepper) return null;
    return (
      <div className={"mx-2 rounded"}>
        {this.props.children}
      </div>
    )
  }
}

StepperContent.propTypes = {
  'id': PropType.string.isRequired,
  'activeStepper': PropType.string.isRequired
}
