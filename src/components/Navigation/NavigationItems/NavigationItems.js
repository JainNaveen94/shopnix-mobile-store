import React from "react";

import navigationItemsCSS from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={navigationItemsCSS.NavigationItems}>
      <NavigationItem link="/products" exact>
        Products
      </NavigationItem>
      <NavigationItem link="/cart">Cart</NavigationItem>
      <NavigationItem link="/login">Login</NavigationItem>
    </ul>
  );
};

export default navigationItems;
