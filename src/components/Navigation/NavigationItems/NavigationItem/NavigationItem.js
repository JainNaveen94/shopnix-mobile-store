import React from "react";
import {NavLink} from 'react-router-dom';

import navigationItemCSS from "./NavigationItem.css";

const navigationItem = (props) => {
  return (
    <li className={navigationItemCSS.NavigationItem}>
      <NavLink
        to={props.link}
        activeClassName={navigationItemCSS.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
