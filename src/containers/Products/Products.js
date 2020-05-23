import React, { Component } from "react";
import productsCSS from "./Products.css";

import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

import Product from "../../components/Product/Product";

import axios from "../../services/axios/axios-product";

class Products extends Component {
  state = {
    products: [],
    loading: false,
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    axios
      .get("/products.json")
      .then((response) => {
        const Products = [];
        for (let key in response.data) {
          Products.push({
            ...response.data[key],
          });
        }
        this.setState({ loading: false, products: Products });
        console.log("[Products.js axios call]", Products);
      })
      .catch((error) => {
        this.setState({ loading: false, orders: [] });
      });
  };

  render() {
    let productList = this.state.products.map((product) => {
      return <Product key={product.id} productDetail={product} />;
    });

    let productsDisplay = (
      <>
        <div className={productsCSS.Title}>
          <h1>Product List</h1>
        </div>
        <div className={productsCSS.Products}>{productList}</div>
      </>
    );

    if (this.state.loading) {
      productsDisplay = <Spinner />;
    }
    return <>{productsDisplay}</>;
  }
}

export default WithErrorHandler(Products, axios);
