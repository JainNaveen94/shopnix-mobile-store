import React from "react";

import pageNotFoundCSS from "./PageNotFound.css";
// import hello from '../../assets/images/bg.gif';

import notfoundLogo from "../../assets/images/notfound.png";

const pageNotFound = (props) => {
  return (
    <div className={pageNotFoundCSS.PageNotFound}>
      <div class={pageNotFoundCSS.PageTitle}>
        <span class="">404 - Page not found</span>
      </div>
      <div class={pageNotFoundCSS.Second}>
        <div style={{ width: "50%" }}>
          <img
            src={notfoundLogo}
            alt="Not Found"
            height="300px"
            width="300px"
          />
        </div>
        <div style={{ width: "30%" }}>
          <div class={pageNotFoundCSS.PageSubTitle} style={{paddingBottom: '32px'}}>
            <span>STAY HOME. SAVE LIVES. DO SHOPPING.</span>
          </div>
          <div>
            <span>
              <a class={pageNotFoundCSS.Href} href="/">
                Go For Shop
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pageNotFound;
