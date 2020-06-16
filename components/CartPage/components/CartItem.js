import React from "react";
import PropTypes from "prop-types"
import Link from "next/link"
import {MDBBtn, MDBIcon, MDBInput} from "mdbreact";

export class CartItem extends React.PureComponent {
  changeHandler = e => {
    //call onChange function passed in props
    this.props.onChange(this.props.id, e.target.value)
  };
  removeFromCartHandler = () => {
    // call the remove from cart function
    this.props.removeFromCart(this.props.id)
  };

  render() {
    const {category, slug, image_url, name, number, price, total} = this.props;

    return (
      <tr className={"td-center"}>
        <td>
          <Link href={"/products/[category]/[slug]"}
                as={`/products/${category}/${slug}`}>
            <img
              src={image_url + "-/resize/100x100/"}
              alt={name}
              height={"100px"}
              className={"rounded-circle"}
              width={"100px"}/>
          </Link>
        </td>
        <td className={"align-middle text-capitalize"}>
          <Link href={"/products/[category]/[slug]"}
                as={`/products/${category}/${slug}`}>
            <a>{name}</a>
          </Link>
        </td>
        <td className={"align-middle"}>
          <MDBInput validate type={"number"} valueDefault={number.toString()} onChange={this.changeHandler}/>
        </td>
        <td className={"align-middle"}>{price}</td>
        <td className={"align-middle"}>{total}</td>
        <td className={"align-middle"}>
          <MDBBtn onClick={this.removeFromCartHandler} className={"rounded-pill"} color={"warning"}>
            <MDBIcon icon={"trash"}/>
          </MDBBtn>
        </td>
      </tr>
    );
  }
}

CartItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  category:PropTypes.string.isRequired,
  slug:PropTypes.string.isRequired,
  image_url:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  number:PropTypes.number.isRequired,
  price:PropTypes.string.isRequired,
  total:PropTypes.string.isRequired
};