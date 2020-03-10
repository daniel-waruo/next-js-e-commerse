import React from "react";
import Link from "next/link";
import {MDBBtn, MDBIcon, MDBInput} from "mdbreact";


export function CartItem(props) {

  const onChange = e => {
    props.handleChange(props.id, e.target.value)
  };

  return (
    <tr className={"td-center"}>
      <td>
        <Link href={"/products/[category]/[slug]"}
              as={`/products/${props.category}/${props.slug}`}>
          <img
            src={props.image_url + "-/resize/100x100/"}
            alt={props.name}
            height={"100px"}
            className={"rounded-circle"}
            width={"100px"}/>
        </Link>
      </td>
      <td className={"align-middle text-capitalize"}>
        <Link href={"/products/[category]/[slug]"}
              as={`/products/${props.category}/${props.slug}`}>
          <a>{props.name}</a>
        </Link>
      </td>
      <td className={"align-middle"}>
        <MDBInput validate  type={"number"} valueDefault={props.number} onChange={onChange}/>
      </td>
      <td className={"align-middle"}>{props.price}</td>
      <td className={"align-middle"}>{props.total}</td>
      <td className={"align-middle"}>
        <MDBBtn onClick={e => props.removeFromCart(props.id)} className={"rounded-pill"} color={"warning"}>
          <MDBIcon icon={"trash"}/>
        </MDBBtn>
      </td>
    </tr>
  );
}

export function Cart(props) {
  // get the cart products data from props
  const {cart: {products, total}} = props;
  // create cart items to render
  const cartItems = products.map(({product, number, total}, key) => {
    // get cart details from product object
    const {id, name, images, slug, discountPrice, category} = product;
    // return cart item
    return (
      <CartItem
        key={key}
        image_url={images[0].image}
        name={name}
        id={id}
        category={category.slug}
        slug={slug}
        number={number}
        price={discountPrice}
        total={total}
        removeFromCart={props.removeFromCart}
        handleChange={props.handleUpdate}
      />
    );
  });
  // TODO: implement real value for total and shipping and number of items in cart
  return (
    <div className={props.className}>
      <h1 className={"text-center"}>Shopping cart</h1>
      <p className="text-muted text-center">You currently have <strong>{products.length} item(s)</strong> in your cart.</p>
      <form onSubmit={e => e.preventDefault()}>
        <div className="table-responsive">
          <table className="table">
            <thead>
            <tr>
              <th colSpan="2">Product</th>
              <th>Quantity</th>
              <th>Unit price</th>
              <th colSpan="2" >Total</th>
            </tr>
            </thead>
            <tbody>{cartItems}</tbody>
            <tfoot>
            <tr>
              <th colSpan="5" className={"text-bold"}>Total</th>
              <th colSpan="2">{total}</th>
            </tr>
            </tfoot>
          </table>
        </div>
        <div className="box-footer d-flex justify-content-between flex-column flex-lg-row">
          <div className="left">
            <Link href={"/"}>
              <a className="btn btn-outline-secondary rounded-pill">
                <MDBIcon icon="arrow-left" className={"p-1"}/>
                Continue shopping
              </a>
            </Link>
          </div>
          <div className="right">
            <MDBBtn type={"submit"} outline color={"secondary"} className={"rounded-pill"} onClick={props.updateCart}>
              <MDBIcon icon="sync-alt" className={"p-1 "}/> Update cart
            </MDBBtn>
            <MDBBtn color={"primary"} className={"rounded-pill"}>
              Proceed to checkout
              <MDBIcon icon="arrow-right" className={"p-1"}/>
            </MDBBtn>
          </div>
        </div>
      </form>
    </div>
  );
}

export function OrderSummary(props) {
  //TODO:implement real data on Order Summary
  // get the cart products data from props
  const {cart: {total}} = props;
  // create cart items to render
  return (
    <div className={props.className}>
      <div className="box-header">
        <h3 className="mb-0 text-center">Order summary</h3>
      </div>
      <p className="text-muted px-3 pt-3">
        Shipping and additional costs are calculated based on the values you
        have entered.
      </p>
      <div className="table-responsive">
        <table className="table">
          <tbody>
          <tr>
            <td>Order subtotal</td>
            <th>{total}</th>
          </tr>
          <tr>
            <td>Shipping and handling</td>
            <th>N/A</th>
          </tr>
          <tr>
            <td>Tax</td>
            <th>N/A</th>
          </tr>
          <tr className="total">
            <td>Total</td>
            <th>{total}</th>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
