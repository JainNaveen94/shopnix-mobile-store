import React from "react";

import buttonCSS from "./Button.css";

const button = (props) => {
  return (
    <button
      className={[buttonCSS.Button, buttonCSS[props.btnType]].join(" ")}
      disabled={props.disabled}
      onClick={() => props.clicked()}
    >
      {props.children}
    </button>
  );
};

export default button;
