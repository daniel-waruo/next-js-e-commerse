import React from 'react';
import {MDBIcon} from 'mdbreact';
import Link from 'next/link'

const NavLink = ({to, title}) => {
  return (
    <Link href={to}>
      <a className="list-group-item list-group-item-action">
        <h5 style={{margin: "0"}} className="justify-content-between d-flex align-items-center">
          {title}
          <MDBIcon icon="angle-right"/>
        </h5>
      </a>
    </Link>
  );
};

export {NavLink};
