import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_EDUCATIONAL_DETAILS,
  GET_EXPERIENCE_DETAILS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  educationaldetails: null,
  experiencedetails: null,
  RequestedList: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
          loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
          loading: false
      };
    case GET_EDUCATIONAL_DETAILS:
      return {
        ...state,
        educationaldetails: action.payload,
          loading: false
      };
    case GET_EXPERIENCE_DETAILS:
      return {
        ...state,
        experiencedetails: action.payload,
          loading: false
      }
      case CLEAR_CURRENT_PROFILE:
        return {
          ...state,
          profile: null
        };
      default:
        return state;
  }
}