import React from 'react';

import backDropCSS from './Backdrop.css';

const backdrop = (props) => {
    return (
        props.show ? <div className={backDropCSS.Backdrop} onClick={() => props.clicked()}></div> : null
    )

}

export default backdrop;