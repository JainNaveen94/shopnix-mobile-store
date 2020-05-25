import * as actionTypes from "../actions/action";

const initalState = {
  products: [],
  filteredProducts: [],
  loading: false,
};

const productReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PRODUCTS:
      return {
        ...state,
        products: action.products,
        filteredProducts: action.products,
        loading: false,
      };
    case actionTypes.INIT_FAILED_PRODUCTS:
      return {
        ...state,
        products: [],
        filteredProducts: [],
        loading: false,
      };

    case actionTypes.SET_PRODUCT_PAGINATION:
      return {
        ...state,
        products: action.products,
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
  // return state;
};

export default productReducer;
