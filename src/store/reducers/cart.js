import * as actionTypes from "../actions/action";

const initialState = {
  cartItems: [],
  loading: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_CART:
      return {
        ...state,
        cartItems: action.cartItems,
        loading: false,
      };

    case actionTypes.INIT_FAILED_CART:
      return {
        ...state,
        cartItems: [],
        loading: false,
      };

    case actionTypes.UPDATE_CART:
      return {
        ...state,
        cartItems: action.cartItems,
        loading: false
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default cartReducer;
