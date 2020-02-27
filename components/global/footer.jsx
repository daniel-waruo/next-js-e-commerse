import React from 'react';
import {MDBFooter} from 'mdbreact';

export function MainFooter() {
  return (
    <MDBFooter className="z-depth-half border">
      <p className='footer-copyright white mb-0 py-3 text-center text-dark'>
        &copy; {new Date().getFullYear()} Copyright:
        <a href='https://www.MDBootstrap.com' className="text-dark"> MDBootstrap.com </a>
      </p>
    </MDBFooter>
  )
}