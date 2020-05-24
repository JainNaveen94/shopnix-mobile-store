import React, { Component } from "react";
import cartCSS from "./Cart.css";

import CartItem from "../../components/Cart/CartItem/CartItem";
import purchaseLogo from "../../assets/icons/purchase.svg";

class Cart extends Component {
  render() {
    return (
      <div className={cartCSS.Cart}>
        <div>
          <h1>Cart</h1>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th className={cartCSS.FirstRow}>Device</th>
                <th className={cartCSS.FirstRow}>Model</th>
                <th className={cartCSS.FirstRow}>Quantity</th>
                <th className={cartCSS.FirstRow}>Price</th>
                <th className={cartCSS.FirstRow}>Action</th>
              </tr>
            </thead>
            <tbody>
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <tr className={cartCSS.LastRow}>
                <td colSpan="2" className={cartCSS.PriceCol}>
                  <strong>Total Price : </strong>Rs.100000
                </td>
                <td colSpan="3" className={cartCSS.PurchaseCol}>
                  <img
                    src={purchaseLogo}
                    width="50px"
                    height="50px"
                    alt="Not Available"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Cart;
