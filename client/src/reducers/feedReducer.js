import {
    ADD_FEEDS,
    GET_FEEDS,
    GET_FEED,
    DELETE_FEED,
    FEEDS_LOADING,
} from '../actions/types';

const initialState = {
    feeds: [],
    post: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FEEDS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_FEEDS:
            return {
                ...state,
                feeds: action.payload,
                    loading: false
            };
        case GET_FEED:
            return {
                ...state,
                post: action.payload,
                    loading: false
            };
        case ADD_FEEDS:
            return {
                ...state,
                feeds: [action.payload, ...state.feeds]
            };
        case DELETE_FEED:
            return {
                ...state,
                feeds: state.feeds.filter(feed => feed._id !== action.payload)
            };
        default:
            return state;
    }
}