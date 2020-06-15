import React from "react";
import {MDBBtn, MDBIcon} from "mdbreact";
import PropType from "prop-types"

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
          <div className="steps-step-2" onClick={this.clickHandler}>
            <MDBBtn href={`#${idFor}`} className={`btn-circle-2 mx-0 btn-${btnColor}`}
                    data-toggle="tooltip"
                    data-placement="top" title=""
                    data-original-title={title}>
              <MDBIcon icon={`${icon}`} className={iconClass}/>
            </MDBBtn>
          </div>
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
      <>
        {this.props.children}
      </>
    )
  }
}

StepperContent.propTypes = {
  'id': PropType.string.isRequired,
  'activeStepper': PropType.bool.isRequired
}

export class StepperSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'stepID': props['initialID']
    }
  }

  setActive = stepID => {
    this.setState({'stepID': stepID})
  }

  render() {
    const activeStepper = this.state['stepID'];
    return (
      <>
        <div>
          <Stepper>
            <Step activeStepper={activeStepper}
                  setActive={this.setActive}
                  icon={"home"}
                  idFor={"him"}
                  title={"Once Face"}
                  btnColor={"warning"}/>
            <Step activeStepper={activeStepper}
                  setActive={this.setActive}
                  icon={"envelope"}
                  idFor={"hem"}
                  title={"Two Face"}/>
            <Step activeStepper={activeStepper}
                  setActive={this.setActive}
                  icon={"user"}
                  idFor={"htm"}
                  title={"Three Face"}/>
          </Stepper>
        </div>
        <StepperContent id={'him'} activeStepper={activeStepper}>
          <h1 className={"text-center"}>1</h1>
        </StepperContent>
        <StepperContent id={'hem'} activeStepper={activeStepper}>
          <h1 className={"text-center"}>2</h1>
        </StepperContent>
        <StepperContent id={'htm'} activeStepper={activeStepper}>
          <h1 className={"text-center"}>3</h1>
        </StepperContent>
      </>
    )
  }

}

StepperSection.propTypes = {
  'initialID': PropType.string.isRequired
}
