import React from 'react';

import drawerToggleCSS from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={drawerToggleCSS.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;