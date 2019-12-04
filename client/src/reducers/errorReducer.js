import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
} from "../actions/types";

const initialState = {
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    case ERROR_LOADING:
      return {
        loading: true
      };
    default:
      return state;
  }
}