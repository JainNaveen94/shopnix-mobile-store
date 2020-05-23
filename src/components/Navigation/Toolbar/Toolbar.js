import React from "react";

import toolBarCSS from "./Toolbar.css";
import Logo from "../../Logo/Logo";

import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
  return (
    <header className={toolBarCSS.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={toolBarCSS.Logo}>
        <Logo />
      </div>
      <nav className={toolBarCSS.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
