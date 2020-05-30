import React from "react";
import Link from "next/link";
import {MDBBtn, MDBIcon} from "mdbreact";
import {CartItem} from './CartItem'
import PropTypes from 'prop-types'

export class CartTable extends React.PureComponent {
  render() {
    // get the cart products data from props
    const {cart: {products, total}} = this.props;
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
          removeFromCart={this.props.removeFromCart}
          onChange={this.props.handleUpdate}/>
      );
    });
    // TODO: implement real value for total and shipping and number of items in cart
    return (
      <div className={this.props.className}>
        <h1 className={"text-center"}>Shopping cart</h1>
        <p className="text-muted text-center">You currently have <strong>{products.length} item(s)</strong> in your
          cart.
        </p>
        <form onSubmit={e => e.preventDefault()}>
          <div className="table-responsive">
            <table className="table">
              <thead>
              <tr>
                <th colSpan="2">Product</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th colSpan="2">Total</th>
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
              <MDBBtn type={"submit"} outline color={"secondary"} className={"rounded-pill"}
                      onClick={this.props.updateCart}>
                <MDBIcon icon="sync-alt" className={"p-1 "}/> Update cart
              </MDBBtn>
              <Link href={"/checkout"}>
                <a className="btn btn-primary rounded-pill">
                  Proceed to checkout
                  <MDBIcon icon="arrow-right" className={"p-1"}/>
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CartTable.propTypes = {
  removeFromCart: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};