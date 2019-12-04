import {
  ADD_FEEDBACK,
  GET_FEEDBACK,
  GET_FEEDBACKS,
  FEED_LOADING,
  DELETE_FEEDBACK
} from "../actions/types";

const intialState = {
  feedbacks: [],
  feedback: {},
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case ADD_FEEDBACK:
      return {
        ...state,
        feedbacks: [action.payload, ...state.feedbacks]
      };
    case GET_FEEDBACKS:
      return {
        ...state,
        feedbacks: action.payload,
        loading: false
      };
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
        loading: false
      };
    case DELETE_FEEDBACK:
      return {
        ...state,
        feedbacks: state.feedbacks.filter(
          feedback => feedback.user !== action.payload
        )
      };
    case FEED_LOADING:
      return {
        loading: true
      };
    default:
      return state;
  }
}
