import {
    CLEAR_EDIT_LOADING,
    EDIT_LOADING
} from "../actions/types";

const initialState = {
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_EDIT_LOADING:
            return {
                loading: false,
            };
        case EDIT_LOADING:
            return {
                loading: true
            };
        default:
            return state;
    }
}