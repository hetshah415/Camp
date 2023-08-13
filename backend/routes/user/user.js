console.log("Here!!!");

const express = require("express");
const User = require("../../../models/user");
const passport = require("passport");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByUsername(email);
  if (user) {
    req.flash("error", "user alrady exists!!!");
    return res.redirect("/campgrounds");
  }
  const createdUser = await new User({
    email,
    username: email,
  });

  const newUser = await User.register(createdUser, password);

  req.flash("success", "successfully registered!!!");
  res.render("user/login");
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/user/login",
  }),
  (req, res) => {
    req.flash("success", "successfully logged in!!!!");
    res.redirect("/campgrounds");
  }
);
module.exports = router;
