import React from 'react';
import {MDBCol, MDBRow} from 'mdbreact';

export function MainFooter() {
  return (
    <div className={"z-depth-1"}>
      <MDBRow center >
        <MDBCol>
          <h5 className={"text-center"}><i>Website Developed by</i></h5>
        </MDBCol>
        <MDBCol size={"12"}>
          <div className="LI-profile-badge d-flex justify-content-center" data-version="v1"
               data-size="large" data-locale="en_US"
               data-type="horizontal" data-theme="light"
               data-vanity="daniel-waruo">
            <a
              className="LI-simple-link"
              href='https://ke.linkedin.com/in/daniel-waruo?trk=profile-badge'>
              Daniel Waruo
            </a>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}