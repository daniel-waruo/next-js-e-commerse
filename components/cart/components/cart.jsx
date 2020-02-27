import React from "react";
import Link from "next/link";
import {MDBBtn, MDBIcon} from "mdbreact";


export function CartItem(props) {

  const onChange = e => {
    props.handleChange(props.id, e.target.value)
  };

  return (
    <tr className={"td-center"}>
      <td>
        <Link href={"/"}>
          <img src={props.image_url + "-/resize/100x100/"} alt={props.name} height={"100px"} width={"100px"}/>
        </Link>
      </td>
      <td>
        <Link href={"/"}>
          <a>{props.name}</a>
        </Link>
      </td>
      <td>
        <input type="number" defaultValue={props.number} onChange={onChange} className="form-control"/>
      </td>
      <td>{props.price}</td>
      <td>{props.discount}</td>
      <td>{props.total}</td>
      <td>
        <MDBBtn onClick={e => props.removeFromCart(props.id)} color={"warning"}>
          <MDBIcon icon={"trash"}/>
        </MDBBtn>
      </td>
    </tr>
  );
}

export function Cart(props) {
  // get the cart products data from props
  const {cart: {products}} = props;
  // create cart items to render
  const cartItems = products.map(({product, number}, key) => {
    // get cart details from product object
    const {id, name, images, price} = product;
    // return cart item
    return (
      <CartItem
        key={key}
        image_url={images[0].image}
        name={name}
        id={id}
        number={number}
        price={price}
        discount={0.0}
        total={10 * number}
        removeFromCart={props.removeFromCart}
        handleChange={props.handleUpdate}
      />
    );
  });
  // TODO: implement real value for total and shipping and number of items in cart
  return (
    <div className={props.className}>
      <h1>Shopping cart</h1>
      <p className="text-muted">You currently have {products.length} item(s) in your cart.</p>

      <div className="table-responsive">
        <table className="table">
          <thead>
          <tr>
            <th colSpan="2">Product</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Discount</th>
            <th colSpan="2">Total</th>
          </tr>
          </thead>
          <tbody>{cartItems}</tbody>
          <tfoot>
          <tr>
            <th colSpan="5">Total</th>
            <th colSpan="2">$446.00</th>
          </tr>
          </tfoot>
        </table>
      </div>
      <div className="box-footer d-flex justify-content-between flex-column flex-lg-row">
        <div className="left">
          <Link href={"/"}>
            <a className="btn btn-outline-secondary">
              <MDBIcon icon="arrow-left" className={"p-1"}/>
              Continue shopping
            </a>
          </Link>
        </div>
        <div className="right">
          <MDBBtn outline color={"secondary"} onClick={props.updateCart}>
            <MDBIcon icon="sync-alt" className={"p-1"}/> Update cart
          </MDBBtn>
          <MDBBtn type="submit" color={"primary"}>
            Proceed to checkout
            <MDBIcon icon="arrow-right" className={"p-1"}/>
          </MDBBtn>
        </div>
      </div>
    </div>
  );
}

export function OrderSummary(props) {
  //TODO:implement real data on Order Summary
  return (
    <div className={props.className}>
      <div className="box-header">
        <h3 className="mb-0">Order summary</h3>
      </div>
      <p className="text-muted">
        Shipping and additional costs are calculated based on the values you
        have entered.
      </p>
      <div className="table-responsive">
        <table className="table">
          <tbody>
          <tr>
            <td>Order subtotal</td>
            <th>$446.00</th>
          </tr>
          <tr>
            <td>Shipping and handling</td>
            <th>$10.00</th>
          </tr>
          <tr>
            <td>Tax</td>
            <th>$0.00</th>
          </tr>
          <tr className="total">
            <td>Total</td>
            <th>$456.00</th>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
