var twitter = require('../lib/twitter')
  , helper = require('../helpers/twitter_middleware')
  , pages = require('./pages')
  , jsonApi = require('./json')
  , user = require('./user');


exports.init = function (app) {
  // helper.gatekeeper("/login") will check if logged in, and send to /login
  // if not logged in. 
  app.get('/', helper.gatekeeper("/login"), pages.index);










  // Warning: No need to touch.
  // ---------------------------------------------
  // User handling. Login and logout.
  app.get('/login', user.login);
  app.get('/logout', user.logout);

  // /oauth sends a request to Twitters OAuth service. If login fail, open route user.login_failed
  app.get('/oauth', twitter.twit.login("/oauth", "/"), user.login_failed);
};