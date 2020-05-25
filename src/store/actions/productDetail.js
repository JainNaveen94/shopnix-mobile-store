import * as actionTypes from "./action";

import axios from "../../services/axios/axios-product";

export const setProductDetail = (product) => {
  return {
    type: actionTypes.INIT_PRODUCT_DETAIL,
    product: product,
  };
};

export const setProductDetailError = () => {
  return {
    type: actionTypes.INIT_FAILED_PRODUCT_DETAIL,
  };
};

export const setProductDetailLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING,
    loading: loading,
  };
};

export const initProductDetail = (id) => {
  return (dispatch) => {
    const loading = true;
    dispatch(setProductDetailLoading(loading));
    axios
      .get("/products/" + id + ".json")
      .then((response) => {
        if (response.data) {
          dispatch(setProductDetail(response.data));
        }
      })
      .catch((error) => {
        dispatch(setProductDetailError());
      });
  };
};
