import React from "react";
import productSearchFilterCSS from "./ProductSearchFilter.css";

const productSearchFilter = (props) => {
  return (
    <div className={productSearchFilterCSS.ProductSearchFilter}>
      <div>
        <button>High to Low</button>
        <button>Low to High</button>
      </div>
      <div>
        <span className={productSearchFilterCSS.Tle}>Mobile List</span>
      </div>
      <div>
        <input className={productSearchFilterCSS.Input} type="text" name="search" value="" placeholder="Search Product" />
      </div>
    </div>
  );
};

export default productSearchFilter;
