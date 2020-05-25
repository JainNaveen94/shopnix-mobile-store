import React, { Component } from "react";
import { connect } from "react-redux";

import productDetailCSS from "./ProductDetail.css";

import axios from "../../../services/axios/axios-product";

import Product from "../../../components/Product/Product";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Model from "../../../components/UI/Model/Model";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";

import * as productDetailAction from "../../../store/actions/index";

class ProductDetail extends Component {
  state = {
    // product: {},
    // loading: false,
    addtoCartMessage: "",
    addtoCartModel: false,
  };

  componentDidMount = () => {
    // this.setState({ loading: true });
    this.props.onInitProductDetail(this.props.match.params.id);
    // axios
    //   .get("/products/" + this.props.match.params.id + ".json")
    //   .then((response) => {
    //     if (response.data) {
    //       this.setState({
    //         loading: false,
    //         product: response.data,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, product: {} });
    //   });
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
    // this.setState({
    //   loading: true,
    // });
    this.props.setLoading(true);
    axios
      .post("/cart.json", cartItem)
      .then((response) => {
        // this.setState({
        //   loading: false,
        // });
        this.props.setLoading(false);
      })
      .catch((error) => {
        // this.setState({
        //   loading: false,
        // });
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
    let productDetail = (
      <>
        <div className={productDetailCSS.Tle}>
          <span>Mobile Detail</span>
        </div>
        <div className={productDetailCSS.ProductDetail}>
          <div className={productDetailCSS.Image}>
            <img
              src={this.props.product.url}
              width="74%"
              height="74%"
              alt="Not Available"
            />
          </div>
          <div className={productDetailCSS.Card}>
            <Product
              viewButton="false"
              key={this.props.product.id}
              productDetail={this.props.product}
              addToCartClicked={(productDetail) =>
                this.addToCartHandler(productDetail)
              }
            />
          </div>
        </div>
      </>
    );

    if (this.props.loading) {
      productDetail = <Spinner />;
    }

    return (
      <>
        <Model
          show={this.state.addtoCartModel}
          modelClose={() => this.modelCloseHandler()}
        >
          <h3>{this.state.addtoCartMessage}</h3>
        </Model>
        {productDetail}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productDetail.product,
    loading: state.productDetail.loading,
  };
};

const mapDispatcherToProps = (dispatch) => {
  return {
    onInitProductDetail: (id) =>
      dispatch(productDetailAction.initProductDetail(id)),
    setLoading: (loading) =>
      dispatch(productDetailAction.setProductDetailLoading(loading)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(WithErrorHandler(ProductDetail, axios));
