import React, { Component } from "react";
import { connect } from "react-redux";

import cartCSS from "./Cart.css";

import CartItem from "../../components/Cart/CartItem/CartItem";
import purchaseLogo from "../../assets/icons/purchase.svg";

import Spinner from "../../components/UI/Spinner/Spinner";
import Model from "../../components/UI/Model/Model";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

import axios from "../../services/axios/axios-product";

import * as cartAction from "../../store/actions/index";

class Cart extends Component {
  state = {
    showModel: false,
    modelMessage: "",
  };

  componentDidMount = () => {
    this.props.onInitCart();
  };

  calculateCartPrice = () => {
    let totalPrice = 0;
    const cartItems = [...this.props.cartItems];
    cartItems.forEach((item) => {
      totalPrice = totalPrice + item.quantity * item.price;
    });
    return totalPrice;
  };

  deleteItemFromCartHandler = (id) => {
    this.props.setLoading(true);
    axios
      .delete("/cart/" + id + ".json")
      .then((response) => {
        const cartItems = [...this.props.cartItems];
        cartItems.splice(
          cartItems.findIndex((item) => item.id === id),
          1
        );
        this.props.updateCart(cartItems);
      })
      .catch((error) => {
        this.props.setLoading(false);
      });
  };

  incrementQuantityHandler = (item) => {
    axios
      .get("/products/" + item.productId + ".json")
      .then((response) => {
        if (response.data.quantity > item.quantity) {
          this.incrementQuantity(item);
        } else {
          this.setState({
            showModel: true,
            modelMessage: `Only ${item.quantity} quantity is Available for this Product`,
          });
        }
      })
      .catch((error) => {
        this.setState({
          showModel: true,
          modelMessage: `Server Issue While Fetching Order`,
        });
      });
  };

  decrementQuantityHandler = (item) => {
    if (item.quantity === 1) {
      this.deleteItemFromCartHandler(item.id);
    } else if (item.quantity > 1) {
      this.decrementQuantity(item);
    } else {
      this.setState({
        showModel: true,
        modelMessage: "Invalid Quanity",
      });
    }
  };

  decrementQuantity = (item) => {
    item.quantity = item.quantity - 1;
    axios
      .patch("/cart/" + item.id + ".json", { quantity: item.quantity })
      .then((response) => {
        const cartItems = [...this.props.cartItems];
        const index = cartItems.findIndex((itm) => itm.id === item.id);
        cartItems[index].quantity = item.quantity;
        this.props.updateCart(cartItems);
      })
      .catch((error) => {
        this.setState({
          showModel: true,
          modelMessage: `Server Issue While Decrement Order`,
        });
      });
  };

  incrementQuantity = (item) => {
    item.quantity = item.quantity + 1;
    axios
      .patch("/cart/" + item.id + ".json", { quantity: item.quantity })
      .then((response) => {
        const cartItems = [...this.props.cartItems];
        const index = cartItems.findIndex((itm) => itm.id === item.id);
        cartItems[index].quantity = item.quantity;
        this.props.updateCart(cartItems);
      })
      .catch((error) => {
        this.setState({
          showModel: true,
          modelMessage: `Server Issue While Incrementing Order`,
        });
      });
  };

  modelCloseHandler = () => {
    this.setState({
      showModel: false,
      modelMessage: "",
    });
  };

  purchaseOrderHandler = () => {
    this.props.setLoading(true);
    axios
      .delete("/cart.json")
      .then((response) => {
        this.props.setLoading(false);
        const orderId = (Date.now() + Math.random()).toFixed(0);
        this.setState({
          showModel: true,
          modelMessage: `Order is Successfully Generated With Order Id ${orderId}`,
        });
        this.props.updateCart([]);
      })
      .catch((error) => {
        this.props.setLoading(false);
        this.setState({
          showModel: true,
          modelMessage: `Order is not Generated due to some Server issue`,
        });
      });
  };

  navigateDetailPageHandler = (productId) => {
    this.props.history.push("/product/" + productId);
  };

  render() {
    let cartItems = this.props.cartItems.map((item) => {
      return (
        <CartItem
          key={item.id}
          item={item}
          deleteItemClicked={(id) => this.deleteItemFromCartHandler(id)}
          incrementQuantityClicked={(item) =>
            this.incrementQuantityHandler(item)
          }
          decrementQuantityClicked={(item) =>
            this.decrementQuantityHandler(item)
          }
          navigateDetailPageClicked={(productId) =>
            this.navigateDetailPageHandler(productId)
          }
        />
      );
    });

    let imageDisplay = (
      <img
        onClick={() => this.purchaseOrderHandler()}
        style={{ cursor: "pointer" }}
        src={purchaseLogo}
        width="50px"
        height="50px"
        alt="Not Available"
      />
    );
    if(this.props.cartItems.length === 0) {
      imageDisplay = null;
    }

    let cartDisplayed = (
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
              {cartItems}
              <tr className={cartCSS.LastRow}>
                <td colSpan="2" className={cartCSS.PriceCol}>
                  <strong>Total Price : </strong>Rs.{this.calculateCartPrice()}
                </td>
                <td colSpan="3" className={cartCSS.PurchaseCol}>
                  {imageDisplay}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    if (this.props.loading) {
      cartDisplayed = <Spinner />;
    }

    return (
      <>
        <Model
          show={this.state.showModel}
          modelClose={() => this.modelCloseHandler()}
        >
          <h3>{this.state.modelMessage}</h3>
        </Model>
        {cartDisplayed}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    loading: state.cart.loading,
  };
};

const mapDispatcherToProps = (dispatch) => {
  return {
    onInitCart: () => dispatch(cartAction.initCart()),
    setLoading: (loading) => dispatch(cartAction.setCartLoading(loading)),
    updateCart: (cartItems) => dispatch(cartAction.updateCart(cartItems)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(WithErrorHandler(Cart, axios));
