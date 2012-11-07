
/*
 * Routs for logging in and out...
 */

var twitter = require('../lib/twitter')
  , url = require("url");

exports.login = function(req, res){
  if(req.session.User) {
    res.redirect("/");
  }

  res.send("Login");
};

exports.login_failed = function (req, res) {
  console.log("login failed");
  res.send("login failed");
};

exports.logout = function (req, res) {
  twitter.logout(req, res);
  res.redirect("/login");
};
