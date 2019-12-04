import {
    FORGOT_SUCCESSMSG,
    REGISTER_SUCCESSMSG,
    CONTACT_SUCCESSMSG,
    CLEAR_MSG
} from '../actions/types'

const intialState = {};

export default function (state = intialState, action) {
    switch (action.type) {
        case FORGOT_SUCCESSMSG:
            return action.payload
        case REGISTER_SUCCESSMSG:
            return action.payload
        case CONTACT_SUCCESSMSG:
            return action.payload
        case CLEAR_MSG: {
            return {}
        }
        default:
            return state;
    }
}