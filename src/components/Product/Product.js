import React from "react";
import productCSS from "./Product.css";

const product = (props) => {
  let specification = { ...props.productDetail };

  delete specification.model;
  delete specification.quantity;
  delete specification.price;
  delete specification.id;
  delete specification.url;

  let tableRow = Object.keys(specification).map((key) => {
    return (
      <tr key={key}>
        <td style={{textTransform: "uppercase"}}>{key}</td>
        <td>{specification[key]}</td>
      </tr>
    );
  });

  return (
    <div className={productCSS.Product}>
      <h1>{props.productDetail.model}</h1>
      <p className={productCSS.Price}>Rs.{props.productDetail.price}</p>
      <div>
        <table>
          <thead>
            <tr>
              <th>Specs</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{tableRow}</tbody>
        </table>
      </div>
      <div>
        <button className={props.viewButton === 'false'?productCSS.NonDisplay:''} onClick={() => props.viewClicked(props.productDetail.id)}>View</button>
        <button>AddToCart</button>
      </div>
    </div>
  );
};

export default product;
