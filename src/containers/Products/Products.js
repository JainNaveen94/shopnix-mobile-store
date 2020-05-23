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
      filteredProducts: [],
      loading: false,
      currentPage: 1,
      productPerPage: 3,
      searchValue: "",
      highActive: "",
      lowActive: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  HighPriceProductHandler = () => {
    this.manageActiveButton("high");
    if (this.state.highActive === "") {
      let products = [...this.state.filteredProducts];
      products = products.sort(this.highPriceSortCompare);
      this.setState({
        products: products,
      });
    } else {
      this.setState({
        products: this.state.filteredProducts,
      });
    }
  };

  lowPriceProductHandler = () => {
    this.manageActiveButton("low");
    if (this.state.lowActive === "") {
      let products = [...this.state.filteredProducts];
      products = products.sort(this.lowPriceSortCompare);
      this.setState({
        products: products,
      });
    } else {
      this.setState({
        products: this.state.filteredProducts,
      });
    }
  };

  highPriceSortCompare = (Obj1, Obj2) => {
    if (Obj1.price > Obj2.price) return -1;
    if (Obj2.price > Obj1.price) return 1;
    return 0;
  };

  lowPriceSortCompare = (Obj1, Obj2) => {
    if (Obj1.price > Obj2.price) return 1;
    if (Obj2.price > Obj1.price) return -1;
    return 0;
  };

  manageActiveButton = (type) => {
    if (type === "high") {
      if (this.state.highActive === "Active") {
        this.setState({
          highActive: "",
          lowActive: "",
        });
      } else {
        this.setState({
          highActive: "Active",
          lowActive: "",
        });
      }
      console.log("high", this.state.highActive);
    } else if (type === "low") {
      if (this.state.lowActive === "Active") {
        this.setState({
          highActive: "",
          lowActive: "",
        });
      } else {
        this.setState({
          highActive: "",
          lowActive: "Active",
        });
      }
    } else {
      this.setState({
        highActive: "",
        lowActive: "",
      });
    }
  };

  searchInputHandler = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
    if (event.target.value === "") {
      this.filteredProductEqualProducts();
    } else {
      this.filteredProductBasedOnSearchValue(event.target.value);
    }
  };

  filteredProductEqualProducts = () => {
    const products = [...this.state.filteredProducts];
    this.setState({
      products: products,
    });
  };

  filteredProductBasedOnSearchValue = (search) => {
    let products = [...this.state.filteredProducts];
    products = products.filter((product) => {
      return (
        product.model.toLowerCase().includes(search.toLowerCase()) ||
        product.color.toLowerCase().includes(search.toLowerCase()) ||
        product.os.toLowerCase().includes(search.toLowerCase()) ||
        product.storage.toLowerCase().includes(search.toLowerCase()) ||
        product.ram.toLowerCase().includes(search.toLowerCase()) ||
        product.screenSize.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({
      products: products,
    });
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
        this.setState({
          loading: false,
          products: Products,
          filteredProducts: Products,
        });
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
          <ProductSearchFilter
            highActive={this.state.highActive}
            lowActive={this.state.lowActive}
            value={this.state.searchValue}
            HighPriceProductClicked={() => this.HighPriceProductHandler()}
            lowPriceProductClicked={() => this.lowPriceProductHandler()}
            searchInput={(event) => this.searchInputHandler(event)}
          />
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
