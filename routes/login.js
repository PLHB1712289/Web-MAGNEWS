var express = require("express");
var router = express.Router();
const passport = require("passport");
const ensureAuthenticated = require("../config/ensureAuth");

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("login", { user: req.user });
});

router.get("/login", function (req, res) {
  //Return to page login
});

router.get("/account", ensureAuthenticated, function (req, res) {
  res.render("login", { user: req.user });
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
