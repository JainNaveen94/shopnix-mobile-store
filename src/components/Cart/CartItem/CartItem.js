import React from "react";

import deleteLogo from "../../../assets/icons/delete.svg";
import addLogo from "../../../assets/icons/add.svg";
import removeLogo from "../../../assets/icons/minus.svg";

import cartItemCSS from "./CartItem.css";

// import cartItemCSS from "./CartItem.css";

const cartItem = (props) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        <img
          src={props.item.url}
          width="50px"
          height="50px"
          alt="Not Available"
        />
      </td>
      <td style={{ textAlign: "center" }}>{props.item.model}</td>
      <td style={{ textAlign: "center" }}>
        <img
          onClick={() => props.decrementQuantityClicked(props.item)}
          style={{ cursor: "pointer" }}
          src={removeLogo}
          width="15px"
          height="25px"
          alt="Not Available"
        />

        <span className={cartItemCSS.Quantity}>{props.item.quantity}</span>
        <img
          onClick={() => props.incrementQuantityClicked(props.item)}
          style={{ cursor: "pointer" }}
          src={addLogo}
          width="15px"
          height="25px"
          alt="Not Available"
        />
      </td>
      <td style={{ textAlign: "center" }}>Rs.{props.item.price}</td>
      <td style={{ textAlign: "center" }}>
        <img
          onClick={() => props.deleteItemClicked(props.item.id)}
          style={{ cursor: "pointer" }}
          src={deleteLogo}
          width="25px"
          height="25px"
          alt="Not Available"
        />
      </td>
    </tr>
  );
};

export default cartItem;
