
/*
 * Routs for web pages..
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};