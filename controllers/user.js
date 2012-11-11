
/*
 * Routes for logging in and out...
 */

var twitter = require('../lib/twitter')
  , url = require("url");

var UserController = exports.UserController = function () {

};

exports.setup = function (app) {
  var controller = new UserController();
  controller.app = app;

  // Warning: No need to touch.
  // ---------------------------------------------
  // User handling. Login and logout.
  app.get('/login', controller.login);
  app.get('/logout', controller.logout);

  // /oauth sends a request to Twitters OAuth service. If login fail, open route user.login_failed
  app.get('/oauth', twitter.twit.login("/oauth", "/timeline"), controller.login_failed);
};

UserController.prototype.login = function(req, res){
  if(req.session.User) {
    res.redirect("/timeline");
  }

  res.render('login');
};

UserController.prototype.login_failed = function (req, res) {
  res.render('error', {
    error_code: 401,
    error_msg: "Authentication failed. Please try again later"
  });
};

UserController.prototype.logout = function (req, res) {
  twitter.logout(req, res);
  res.redirect("/login");
};
