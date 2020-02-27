import React from 'react';
import {MDBIcon} from 'mdbreact';
import {useRouter} from "next/router"
import querystring from "../../../_queryParse";

const NavLink = ({to, title, history, id}) => {
  const router = useRouter();
  const onClick = async e => {
    await router.push({
      pathname: "/products",
      search: querystring.toQuery({categories: [id]})
    });
  };
  return (
    <div className="list-group-item list-group-item-action" onClick={onClick}>
      <h5 style={{margin: "0"}} className="justify-content-between d-flex align-items-center">
        {title}
        <MDBIcon icon="angle-right"/>
      </h5>
    </div>
  );
};

export default NavLink;
