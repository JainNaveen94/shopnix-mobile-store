import React, { Component } from "react";
import cartCSS from "./Cart.css";

import CartItem from "../../components/Cart/CartItem/CartItem";
import purchaseLogo from "../../assets/icons/purchase.svg";

import Spinner from "../../components/UI/Spinner/Spinner";
import Model from "../../components/UI/Model/Model";

import axios from "../../services/axios/axios-product";

class Cart extends Component {
  state = {
    cartItems: [],
    loading: false,
    showModel: false,
    modelMessage: "",
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
    });
    axios
      .get("/cart.json")
      .then((response) => {
        const cartItems = [];
        for (let key in response.data) {
          cartItems.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({
          cartItems: cartItems,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          cartItems: [],
          loading: false,
        });
      });
  };

  calculateCartPrice = () => {
    let totalPrice = 0;
    const cartItems = [...this.state.cartItems];
    cartItems.forEach((item) => {
      totalPrice = totalPrice + item.quantity * item.price;
    });
    return totalPrice;
  };

  deleteItemFromCartHandler = (id) => {
    this.setState({
      loading: true,
    });
    axios
      .delete("/cart/" + id + ".json")
      .then((response) => {
        const cartItems = [...this.state.cartItems];
        cartItems.splice(
          cartItems.findIndex((item) => item.id === id),
          1
        );
        this.setState({
          loading: false,
          cartItems: cartItems,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
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
        const cartItems = [...this.state.cartItems];
        const index = cartItems.findIndex((itm) => itm.id === item.id);
        cartItems[index].quantity = item.quantity;
        this.setState({
          cartItems: cartItems,
        });
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
        const cartItems = [...this.state.cartItems];
        const index = cartItems.findIndex((itm) => itm.id === item.id);
        cartItems[index].quantity = item.quantity;
        this.setState({
          cartItems: cartItems,
        });
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
    // axios
    //   .delete("/cart.json")
    //   .then((response) => {
    //     const cartItems = [...this.state.cartItems];
    //     cartItems.splice(
    //       cartItems.findIndex((item) => item.id === id),
    //       1
    //     );
    //     this.setState({
    //       loading: false,
    //       cartItems: cartItems,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       loading: false,
    //     });
    //   });
  }

  render() {
    let cartItems = this.state.cartItems.map((item) => {
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
        />
      );
    });

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
                  <img
                    onClick={() => this.purchaseOrderHandler()}
                    style={{ cursor: "pointer" }}
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

    if (this.state.loading) {
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

export default Cart;
