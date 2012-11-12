var helper = require('../helpers/twitter_middleware');

/*
 * Routes for web pages..
 */

var PagesController = exports.Pages = function () {

};

exports.setup = function (app) {
  var controller = new PagesController();
  controller.app = app;

  // helper.gatekeeper("/login") will check if logged in, and send to /login
  // if not logged in. 
  app.get('/', helper.gatekeeper("/login"), controller.index);
  app.get('/timeline', helper.gatekeeper('/login'), controller.index);
  app.get('/search', helper.gatekeeper('/login'), controller.index);
  app.get('/favorites', helper.gatekeeper('/login'), controller.index);
};


/*************************************************
 *  IMPLEMENT STUFF HERE. FOR THE MOST PART
 *************************************************/

PagesController.prototype.index = function(req, res){
  res.render('index', { 

  });
};