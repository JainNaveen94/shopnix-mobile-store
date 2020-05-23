import React, { Component } from "react";

import layoutCSS from "./Layout.css";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <>
        <Toolbar drawerToggleClicked={() => this.sideDrawerToggleHandler()} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={() => this.sideDrawerClosedHandler()}
        />
        <main className={layoutCSS.container}>{this.props.children}</main>
      </>
    );
  }
}

// const layout = (props) => {
//   return (
//     <>
//       <Toolbar />
//       <main className={layoutCSS.container}>{props.children}</main>
//     </>
//   );
// };

export default Layout;
