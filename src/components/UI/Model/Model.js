import React, { Component } from "react";

import modelCSS from "./Model.css";

import Backdrop from "../Backdrop/Backdrop";


class Model extends Component {

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  
  render() {
    return (
      <>
      <Backdrop show={this.props.show} clicked={() => this.props.modelClose()} />
      <div
        className={modelCSS.Model}
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0",
        }}
      >
        {this.props.children}
      </div>
      </>
    );
  }
}

// const model = (props) => {
//   return (
//     <>
//     <Backdrop show={props.show} clicked={() => props.modelClose()} />
//     <div
//       className={modelCSS.Model}
//       style={{
//         transform: props.show ? "translateY(0)" : "translateY(-100vh)",
//         opacity: props.show ? "1" : "0",
//       }}
//     >
//       {props.children}
//     </div>
//     </>
//   );
// };

export default Model;
