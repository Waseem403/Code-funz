import React, {
  Component
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import {
  Provider
} from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser
} from "./actions/authActions";
import "./App.css";
import Layout from "./Components/Layouts/Layout";
import Homepage1 from "./Components/Homepage/Homepage1";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Contact from "./Components/Unsecurepages/Contact";
import News from "./Components/Unsecurepages/News";
import AnnualFunc from "./Components/Unsecurepages/AnnualFunc";
import PrivateRoute from "./Components/private/private";
import Dashboard from "./Components/Dashboard/Dashboard";
import Forgot from "./Components/Auth/Forgot";
import Feedind from "./Components/Dashboard/Feedback/Feedind";
import Profile from "./Components/Dashboard/Profile/GetProfile/Profile";
import Profiles from "./Components/Dashboard/Profile/GetProfiles/Profiles";
import Profileind from "./Components/Dashboard/Profile/CreateProfile/Profileind";
import CreateProfile from "./Components/Dashboard/Profile/CreateProfile/menubutton/CreateProfile";
import UploadImg from "./Components/Dashboard/Profile/CreateProfile/menubutton/updateprofile/UploadImg";
import BgImageUpload from "./Components/Dashboard/Profile/CreateProfile/menubutton/updateprofile/BgImageUpload"
import Education from "./Components/Dashboard/Profile/CreateProfile/menubutton/updateprofile/Education";
import Experience from "./Components/Dashboard/Profile/CreateProfile/menubutton/updateprofile/Experience";
import Posts from "./Components/Dashboard/posts/Posts";
import Post from "./Components/Dashboard/post/Post";
import TodoLists from "./Components/Dashboard/Profile/CreateProfile/menubutton/updateprofile/Sticky Notes/TodoLists";
import EditProfile from "./Components/Dashboard/Profile/CreateProfile/EditProfile/EditProfile"
import EditEducation from "./Components/Dashboard/Profile/CreateProfile/menubutton/updateprofile/UpdateCred/EditEducation"
import EditExperience from "./Components/Dashboard/Profile/CreateProfile/menubutton/updateprofile/UpdateCred/EditExperience"
import Poll from "./Components/Dashboard/Pool/Poll"
import UserDashboard from "./Components/Dashboard/Admin_Panel/UserDashboard"
import PollIndex from "./Components/Dashboard/Admin_Panel/DashboardItems/PollInfo/PollIndex"
import RequestedListIndex from "./Components/Dashboard/Admin_Panel/Friends/RequestedList/RequestedListIndex"
import FriendListIndex from "./Components/Dashboard/Admin_Panel/Friends/FriendsLists/FriendListIndex"
import Todolisted from "./Components/Dashboard/Admin_Panel/DashboardItems/TodoLists/index"

import javascript from "./Components/Courses/Javascript/index"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router >
          <div className="App" >
            <Layout />
            <Route exact path="/" component={Homepage1} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/News" component={News} />

            <Route exact path="/Annual" component={AnnualFunc} />
            <Route exact path="/Contact" component={Contact} />
            <Route exact path="/Forgot" component={Forgot} />
            < Switch >
              < PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

            <Switch >
              <PrivateRoute exact path="/feed" component={Feedind} />
              <PrivateRoute exact path="/Getyourprofile" component={Profileind} />
              <PrivateRoute exact path="/Getprofile/:handle" component={Profile} />{" "}
              <PrivateRoute exact path="/Getprofiles" component={Profiles} />
              <PrivateRoute exact path="/Create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/Profilepic" component={UploadImg} />
              <PrivateRoute exact path="/bgimage" component={BgImageUpload} />
              <PrivateRoute exact path="/Education" component={Education} />
              <PrivateRoute exact path="/Experience" component={Experience} />
              <PrivateRoute exact path="/Todos" component={TodoLists} />
              <PrivateRoute exact path="/test" component={Profileind} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <PrivateRoute exact path="/Poll" component={Poll} />
              <PrivateRoute exact path="/EditEducation/:Education_id" component={EditEducation} />
              <PrivateRoute exact path="/EditExperience/:Experience_handler" component={EditExperience} />
              <PrivateRoute exact path="/UserDashboard" component={UserDashboard} />
              <PrivateRoute exact path="/PollIndex" component={PollIndex} />
              <PrivateRoute exact path="/Following" component={RequestedListIndex} />
              <PrivateRoute exact path="/Followers" component={FriendListIndex} />
              <PrivateRoute exact path="/Todolisted" component={Todolisted} />
              <PrivateRoute exact path="/javascript" component={javascript} />
            </Switch>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;