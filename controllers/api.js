
/*
 * Routes for the JSON API.
 */
var twitter = require('../lib/twitter')
  , helper = require('../helpers/twitter_middleware');

var APIController = function () { };

exports.APIController = APIController;

exports.setup = function (app) {
  var controller = new APIController();
  APIController.app = app;

  // API Routes
  app.get('/timeline.json', helper.gatekeeper('/login'), controller.timeline);
  app.get('/search.json', helper.gatekeeper('/login'), controller.search);
  app.post('/status.json', helper.gatekeeper('/login'), controller.statusPost);
  app.get('/favorites.json', helper.gatekeeper('/login'), controller.favorites);
};

APIController.prototype.timeline = function (req, res) {

};


APIController.prototype.favorites = function (req, res) {

};


APIController.prototype.search = function (req, res) {
  
};


APIController.prototype.statusPost = function (req, res) {
  
};