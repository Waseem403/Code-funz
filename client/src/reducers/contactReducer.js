import { CONTACT_INFO } from "../actions/types";

const initialState = {
  contacts: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTACT_INFO:
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
}
