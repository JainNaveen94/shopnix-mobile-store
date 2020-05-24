import React from "react";

import deleteLogo from "../../../assets/icons/delete.svg";
import addLogo from "../../../assets/icons/add.svg";
import removeLogo from "../../../assets/icons/minus.svg";

import cartItemCSS from "./CartItem.css";

// import cartItemCSS from "./CartItem.css";

const cartItem = (props) => {
  return (
    // <div className={cartItemCSS.CartItem}>
    <tr>
      <td style={{textAlign: "center"}}>
        <img
          src="https://www.bsetechnology.com/wp-content/uploads/2018/07/iPhoneX-silver-1.jpg"
          width="50px"
          height="50px"
          alt="Not Available"
        />
      </td>
      <td style={{textAlign: "center"}}>Iphone X</td>
      <td style={{textAlign: "center"}}>
        <img src={addLogo} width="15px" height="25px" alt="Not Available" />
        <span className={cartItemCSS.Quantity}>10</span>
        <img src={removeLogo} width="15px" height="25px" alt="Not Available" />
      </td>
      <td style={{textAlign: "center"}}>Rs.10000</td>
      <td style={{textAlign: "center"}}>
        <img src={deleteLogo} width="25px" height="25px" alt="Not Available" />
      </td>
    </tr>
    // </div>
  );
};

export default cartItem;
