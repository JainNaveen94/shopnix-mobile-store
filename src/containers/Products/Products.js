import React, { Component } from "react";
import productsCSS from "./Products.css";

import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

import Product from "../../components/Product/Product";
import ProductSearchFilter from "../../components/Product/ProductSearchFilter/ProductSearchFilter";

import axios from "../../services/axios/axios-product";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: false,
      currentPage: 1,
      productPerPage: 3,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

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
    const { products, currentPage, productPerPage } = this.state;

    // Logic for displaying products
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    let productList = currentProducts.map((product, key) => {
      return <Product key={product.id} productDetail={product} />;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      if (number === this.state.currentPage) {
        return (
          <>
            <button
              className={productsCSS.Active}
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </button>
          </>
        );
      } else {
        return (
          <>
            <button key={number} id={number} onClick={this.handleClick}>
              {number}
            </button>
          </>
        );
      }
    });

    let productsDisplay = (
      <>
        <div className={productsCSS.Title}>
          {/* <h1>Product List</h1> */}
          <ProductSearchFilter />
        </div>
        <div className={productsCSS.Products}>{productList}</div>
        <div className={productsCSS.Pagination}>{renderPageNumbers}</div>
      </>
    );

    if (this.state.loading) {
      productsDisplay = <Spinner />;
    }
    return <>{productsDisplay}</>;
  }
}

export default WithErrorHandler(Products, axios);
