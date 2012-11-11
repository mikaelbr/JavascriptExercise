
var twit = require('ntwitter')
  , config = require('config').Twitter;

var Twitter = function () {
  this.twit = new twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret
  });
};

Twitter.prototype.logout = function (req, res) {
  res.clearCookie('twauth');
  req.session.destroy();
  this.twit.options.access_token_key = null;
  this.twit.options.access_token_secret = null;
};





module.exports = new Twitter();
