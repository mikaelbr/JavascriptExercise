
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
  var params = {
    count: req.param('count') || 20,
    
  }
  , since_id = req.param('since_id') || undefined
  , max_id = req.param('max_id') || undefined;

  if (since_id) {
    params.since_id = req.param('since_id');
  }
  
  if (max_id) {
    params.max_id = req.param('max_id');
  }

  twitter.twit.get('/statuses/home_timeline.json', params, function (err, data) {
    if (err) {
      return res.json(err);
    }

    res.json(data);
  });

};


APIController.prototype.favorites = function (req, res) {
  var params = {
    count: req.param('count') || 50,
  }
  , since_id = req.param('since_id') || undefined
  , max_id = req.param('max_id') || undefined;

  if (since_id) {
    params.since_id = req.param('since_id');
  }
  
  if (max_id) {
    params.max_id = req.param('max_id');
  }

  twitter.twit.get('/favorites/list.json', params, function (err, data) {
    if (err) {
      return res.json(err);
    }

    res.json(data);
  });

};


APIController.prototype.search = function (req, res) {
  var params = {
      q: req.param('q') || ''
    , count: req.param('count') || 50
  };

  twitter.twit.get('/search/tweets.json', params, function (err, data) {
    if (err) {
      return res.json(err);
    }
    res.json(data);
  });
};

APIController.prototype.statusPost = function (req, res) {
  var params = {
    status: req.param('status') || '',
    include_entities: 1
  };

  twitter.twit.post('/statuses/update.json', params, null, function (err, data) {
    if (err) {
      return res.json(err);
    }
    res.json(data);
  });
};