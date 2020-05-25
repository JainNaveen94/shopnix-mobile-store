import * as actionTypes from "../actions/action";

const initialState = {
  product: {},
  loading: false,
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PRODUCT_DETAIL:
      return {
        ...state,
        product: action.product,
        loading: false,
      };

    case actionTypes.INIT_FAILED_PRODUCT_DETAIL:
      return {
        ...state,
        product: {},
        loading: false,
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

export default productDetailReducer;
