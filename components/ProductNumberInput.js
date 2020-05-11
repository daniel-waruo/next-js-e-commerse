import React from "react";
import {MDBCol, MDBInput, MDBInputGroup, MDBRow} from "mdbreact";

export default props => {
  const {textColor, maxValue = "10", ...otherProps} = props;
  return (
    <MDBRow center>
      <MDBCol size={"6"} md={"8"}>
        <MDBInputGroup material
                       containerClassName={"mb-3 mt-0"}
                       labelClassName={` ${textColor}`}
                       textClassName={` ${textColor}`}
                       className={`${textColor} `}
                       size={"lg"}
                       inputs={<MDBInput className={`${textColor}`} min="1" valueDefault={"1"} max={maxValue}
                                         type={"number"} {...otherProps}/>}
                       hint="Number of Products"
                       prepend={"Quantity"}/>
      </MDBCol>
    </MDBRow>

  )
}