import {
    POLL_LOADING,
    ADD_POLL,
    GET_POLLS,
    DELETE_POLL
} from '../actions/types';

const initialState = {
    Polls: [],
    Poll: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POLL_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_POLLS:
            return {
                ...state,
                Polls: action.payload,
                    loading: false
            };
        case ADD_POLL:
            return {
                ...state,
                Polls: [action.payload, ...state.Polls],
                    loading: false
            };
        case DELETE_POLL:
            return {
                ...state,
                Polls: state.Polls.filter(feed => feed._id !== action.payload)
            };
        default:
            return state;
    }
}