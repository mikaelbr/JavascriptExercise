var controllers = ['pages', 'user', 'api'];
exports.init = function (app) {
  controllers.map(function (controllerName) {
    var controller = require('./' + controllerName);
    controller.setup(app);
  });
};