if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
  console.log(process.env.CLOUD_NAME);
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const client = require("../db/dbConnection");
const campground = require("./routes/campground/campground");
const review = require("./routes/review/review");
const user = require("./routes/user/user");
const Campground = require("../models/campground");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const catchAsyncError = require("../util/catchAsyncError");


client
  .then(() => {
    console.log("Connected to mongodb database");
  })
  .catch((e) => {
    console.log("error in database");
    console.log(e);
  });



app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

const sessionContent = {
  secret: "thisshouldbeabettersceret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionContent));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "..", 'public')))

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "successfully logged out!!!!");
    res.redirect("/");
  });
});

app.get(
  "/fakeUser",
  catchAsyncError(async (req, res) => {
    const user = new User({
      email: "hetshaha@gmail.com",
      username: "shaha",
    });
    const newUser = await User.register(user, "thisismypassword");
    res.send(newUser);
  })
);

app.use("/user", user);
app.use("/campgrounds", campground);
app.use("/campgrounds/review", review);

app.use((err, req, res, next) => {
  const { statusCode = 400, ExpressMessage = err.message } = err;
  res.render("campground/error", { statusCode, ExpressMessage });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port number 3000");
});
