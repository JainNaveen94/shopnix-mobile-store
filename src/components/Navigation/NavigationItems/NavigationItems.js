import React, { Component } from "react";
import { withRouter } from "react-router";

import navigationItemsCSS from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    this.props.history.push("/products");
  };

  render() {
    let routeDisplay = (
      <ul className={navigationItemsCSS.NavigationItems}>
        <NavigationItem link="/products" exact>
          Products
        </NavigationItem>
        <NavigationItem link="/cart">Cart</NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
      </ul>
    );

    if (localStorage.getItem("Token") === "admin") {
      routeDisplay = (
        <ul className={navigationItemsCSS.NavigationItems}>
          <NavigationItem link="/products" exact>
            Products
          </NavigationItem>
          <NavigationItem link="/cart">Cart</NavigationItem>
          <button className={navigationItemsCSS.NavButton} onClick={() => this.Logout()}>Logout</button>
          {/* <NavigationItem link="/login">Login</NavigationItem> */}
        </ul>
      );
    }

    return (
     <> { routeDisplay }</>
    );
  }
}

export default withRouter(NavigationItems);
