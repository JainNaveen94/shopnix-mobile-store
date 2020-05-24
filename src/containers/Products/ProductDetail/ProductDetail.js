import React, { Component } from "react";
import productDetailCSS from "./ProductDetail.css";

import axios from "../../../services/axios/axios-product";

import Product from "../../../components/Product/Product";
import Spinner from "../../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";

class ProductDetail extends Component {
  state = {
    product: {},
    loading: false,
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    axios
      .get("/products/" + this.props.match.params.id + ".json")
      .then((response) => {
        if (response.data) {
          this.setState({
            loading: false,
            product: response.data,
          });
        }
      })
      .catch((error) => {
        this.setState({ loading: false, product: {} });
      });
  };

  render() {
    let productDetail = (
      <>
        <div className={productDetailCSS.Tle}>
          <span>Product Detail</span>
        </div>
        <div className={productDetailCSS.ProductDetail}>
          <div className={productDetailCSS.Image}>
            <img
              src={this.state.product.url}
              width="74%"
              height="74%"
              alt="Not Available"
            />
          </div>
          <div className={productDetailCSS.Card}>
            <Product
              viewButton="false"
              key={this.state.product.id}
              productDetail={this.state.product}
            />
          </div>
        </div>
      </>
    );

    if (this.state.loading) {
      productDetail = <Spinner />;
    }

    return <>{productDetail}</>;
  }
}

export default WithErrorHandler(ProductDetail, axios);
