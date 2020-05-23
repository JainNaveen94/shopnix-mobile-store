import React from "react";
import productSearchFilterCSS from "./ProductSearchFilter.css";

const productSearchFilter = (props) => {
  return (
    <div className={productSearchFilterCSS.ProductSearchFilter}>
      <div>
        <button className={productSearchFilterCSS[props.highActive]} onClick={() => props.HighPriceProductClicked()}>High to Low</button>
        <button className={productSearchFilterCSS[props.lowActive]} onClick={() => props.lowPriceProductClicked()}>Low to High</button>
      </div>
      <div>
        <span className={productSearchFilterCSS.Tle}>Mobile List</span>
      </div>
      <div>
        <input onChange={props.searchInput} className={productSearchFilterCSS.Input} type="text" name="search" value={props.value} placeholder="Search Product" />
      </div>
    </div>
  );
};

export default productSearchFilter;
