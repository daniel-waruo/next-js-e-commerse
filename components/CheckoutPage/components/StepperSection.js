import React from "react";
import PropType from "prop-types"
import DeliveryDataForm from "./DeliveryDataForm";
import DeliveryLocation from "./DeliveryLocation";
import {Stepper, Step, StepperContent} from "./Stepper.js";

export class StepperSection extends React.Component {
  state = {
    stepID: 'contact-info'
  }
  setActive = stepID => {
    this.setState({stepID: stepID})
  }

  render() {
    const activeStepper = this.state['stepID'];
    return (
      <>
        <div className={"px-2"}>
          <Stepper>
            <Step activeStepper={activeStepper}
                  setActive={this.setActive}
                  iconClass={"far fa-address-card"}
                  idFor={"contact-info"}
                  title={"Delivery Contact Information"}
                  btnColor={"warning"}/>
            <Step activeStepper={activeStepper}
                  setActive={this.setActive}
                  icon={"globe-africa"}
                  idFor={"delivery-location"}
                  title={"Select Delivery Location On Map"}/>
            <Step activeStepper={activeStepper}
                  setActive={this.setActive}
                  icon={"money-bill-alt"}
                  iconClass={"far"}
                  idFor={"payment"}
                  title={"Pay For The Order"}/>
          </Stepper>
        </div>
        <StepperContent id={"contact-info"} activeStepper={activeStepper}>
          <DeliveryDataForm/>
        </StepperContent>
        <StepperContent id={'delivery-location'} activeStepper={activeStepper}>
          <DeliveryLocation/>
        </StepperContent>
        <StepperContent id={'payment'} activeStepper={activeStepper}>
          <h1 className={"text-center"}>3</h1>
        </StepperContent>
      </>
    )
  }

}

