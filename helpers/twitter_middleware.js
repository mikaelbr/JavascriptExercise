var twitter = require("../lib/twitter");

exports.gatekeeper = function (failure) {
  
  var self = twitter;

  var errFn = function (res) {
    res.redirect(failure);
    return;
  }

  return function (req, res, next) {
    console.log("Trying session");
    if(req.session.User) {
      console.log("Session Cached:");
      console.log(req.session.User);
      return next();
    }

    var twauth = self.twit.cookie(req);

    if ( !twauth || !twauth.user_id || !twauth.access_token_secret ) {
      return errFn(res);
    }

    self.twit.options.access_token_key = twauth.access_token_key;
    self.twit.options.access_token_secret = twauth.access_token_secret; 

    self.twit.verifyCredentials(function (err, data) {
      if(err) {
        console.log(err);
        return errFn(res);
      }
      console.log("Set new session");
      req.session.User = data;
      next();
    });
  };
};