import * as actionTypes from "./action";

import axios from "../../services/axios/axios-product";

export const setCart = (cartItems) => {
  return {
    type: actionTypes.INIT_CART,
    cartItems: cartItems,
  };
};

export const setCartError = () => {
  return {
    type: actionTypes.INIT_FAILED_CART,
  };
};

export const setCartLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING,
    loading: loading,
  };
};

export const updateCart = (cartItems) => {
  return {
    type: actionTypes.UPDATE_CART,
    cartItems: cartItems,
  };
};

export const initCart = () => {
  return (dispatch) => {
    const loading = true;
    dispatch(setCartLoading(loading));
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
        dispatch(setCart(cartItems));
      })
      .catch((error) => {
        dispatch(setCartError());
      });
  };
};
