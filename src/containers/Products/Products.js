import React, { Component } from "react";
import { connect } from "react-redux";

import productsCSS from "./Products.css";

import Spinner from "../../components/UI/Spinner/Spinner";
import Model from "../../components/UI/Model/Model";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

import Product from "../../components/Product/Product";
import ProductSearchFilter from "../../components/Product/ProductSearchFilter/ProductSearchFilter";

import axios from "../../services/axios/axios-product";

import * as productAction from "../../store/actions/index";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      productPerPage: 3,
      searchValue: "",
      highActive: "",
      lowActive: "",
      addtoCartMessage: "",
      addtoCartModel: false,
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
      let products = [...this.props.filteredProducts];
      products = products.sort(this.highPriceSortCompare);
      this.props.setProductsForPagination(products);
    } else {
      this.props.setProductsForPagination(this.props.filteredProducts);
    }
  };

  lowPriceProductHandler = () => {
    this.manageActiveButton("low");
    if (this.state.lowActive === "") {
      let products = [...this.props.filteredProducts];
      products = products.sort(this.lowPriceSortCompare);
      this.props.setProductsForPagination(products);
    } else {
      this.props.setProductsForPagination(this.props.filteredProducts);
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
    const products = [...this.props.filteredProducts];
    this.props.setProductsForPagination(products);
  };

  filteredProductBasedOnSearchValue = (search) => {
    let products = [...this.props.filteredProducts];
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
    this.props.setProductsForPagination(products);
  };

  componentDidMount = () => {
    this.props.onInitProducts();
  };

  viewProductHandler = (productId) => {
    this.props.history.push("/product/" + productId);
  };

  addToCartHandler = (productDetail) => {
    axios
      .get("/cart.json")
      .then((response) => {
        const cartItems = [];
        for (let key in response.data) {
          cartItems.push({
            ...response.data[key],
            id: key,
          });
        }
        if (this.checkForProductInCart(cartItems, productDetail.id)) {
          this.setState({
            addtoCartModel: true,
            addtoCartMessage: "Product Already Exist in your cart",
          });
        } else {
          const cartItem = this.generateCartObject(productDetail);
          this.addNewProductToCart(cartItem);
          this.setState({
            addtoCartModel: true,
            addtoCartMessage: "Product Added in your cart Successfully",
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  checkForProductInCart = (cartItems, productId) => {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].productId === productId) {
        return true;
      }
    }
    return false;
  };

  addNewProductToCart = (cartItem) => {
    this.props.setLoading(true);
    axios
      .post("/cart.json", cartItem)
      .then((response) => {
        this.props.setLoading(false);
      })
      .catch((error) => {
        this.props.setLoading(false);
      });
  };

  generateCartObject = (productDetail) => {
    return {
      productId: productDetail.id,
      model: productDetail.model,
      url: productDetail.url,
      quantity: 1,
      price: productDetail.price,
    };
  };

  modelCloseHandler = () => {
    this.setState({
      addtoCartModel: false,
      addtoCartMessage: "",
    });
  };

  render() {
    const { currentPage, productPerPage } = this.state;
    const products = this.props.products;

    // Logic for displaying products
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    let productList = currentProducts.map((product, key) => {
      return (
        <Product
          viewButton="true"
          key={product.id}
          productDetail={product}
          viewClicked={(productId) => this.viewProductHandler(productId)}
          addToCartClicked={(productDetail) =>
            this.addToCartHandler(productDetail)
          }
        />
      );
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

    if (this.props.loading) {
      productsDisplay = <Spinner />;
    }
    return (
      <>
        <Model
          show={this.state.addtoCartModel}
          modelClose={() => this.modelCloseHandler()}
        >
          <h3>{this.state.addtoCartMessage}</h3>
        </Model>
        {productsDisplay}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    filteredProducts: state.product.filteredProducts,
    loading: state.product.loading,
  };
};

const mapDispatcherToProps = (dispatch) => {
  return {
    onInitProducts: () => dispatch(productAction.initProducts()),
    setLoading: (loading) => dispatch(productAction.setLoading(loading)),
    setProductsForPagination: (products) =>
      dispatch(productAction.setProductsPagination(products)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(WithErrorHandler(Products, axios));
