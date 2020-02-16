const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const contacts = require("./routes/api/contacts");
const feedback = require("./routes/api/Reviewed");
const forget_password = require("./routes/api/Forget_password");
const gmail_box = require("./routes/api/LiveChat");
const ProfileFeeds = require("./routes/api/ProfileFeeds");
const profilevisiters = require("./routes/api/Profiler")
const Poll = require("./routes/api/Poll")
const FriendsRequests = require("./routes/api/FriendRequests")
const Follow = require("./routes/api/FollowPeople")
const Widget = require("./routes/api/WidgetList")

const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//setting the view engine
app.use(expressLayouts);
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,useFindAndModify:false
  })
  .then(() => console.log("Connected To MongoDB"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/ProfileFeeds", ProfileFeeds);
app.use("/api/posts", posts);
app.use("/api/contacts", contacts);
app.use("/feedback", feedback);
app.use("/gmail", gmail_box);
app.use("/password/", forget_password);
app.use("/profilevisiters", profilevisiters)
app.use("/Poll", Poll)
app.use("/Friends", FriendsRequests)
app.use("/Follow", Follow)
app.use("/Widget", Widget)
app.use(function (req, res, next) {
  res.status(404).render("404");
});

// Server static assets if in production
 if (process.env.NODE_ENV === "production") {
   // Set static folder
   app.use(express.static("client/build"));

   app.get("*", (req, res) => {
     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
 }

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running on port ${port}`));