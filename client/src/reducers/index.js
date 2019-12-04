import {
  combineReducers
} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import contactReducer from "./contactReducer";
import feedbackReducer from "./feedbackReducer";
import successreducer from "./successreducer";
import EditEducation from "./EditEducation"
import feedReducer from "./feedReducer"
import PollReducer from "./PollReducer"


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  contactinfo: contactReducer,
  feedback: feedbackReducer,
  success_msg: successreducer,
  EditEducationDetails: EditEducation,
  profileFeeds: feedReducer,
  Poll: PollReducer
});