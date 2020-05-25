import * as actionTypes from "./action";

import axios from "../../services/axios/axios-product";

export const setProducts = (products) => {
  return {
    type: actionTypes.INIT_PRODUCTS,
    products: products,
  };
};

export const setProductsError = () => {
    return {
        type: actionTypes.INIT_FAILED_PRODUCTS
    }
}

export const setProductsPagination = (products) => {
    return {
        type: actionTypes.SET_PRODUCT_PAGINATION,
        products: products
    }
}

export const setLoading = (loading) => {
    return {
        type: actionTypes.SET_LOADING,
        loading: loading
    }
}

export const initProducts = () => {
  return (dispatch) => {
    const loading = true;
    dispatch(setLoading(loading));
    axios
      .get("/products.json")
      .then((response) => {
        const Products = [];
        for (let key in response.data) {
          Products.push({
            ...response.data[key],
          });
        }
        dispatch(setProducts(Products))
      })
      .catch((error) => {
        dispatch(setProductsError())
      });
  };
};


