/**
 * Main application routes
 */

'use strict';
var request = require('request');
var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.route('/:url(assets|images)/*')
    .get(function(req, res) {
      var url = 'http://localhost:8000' + req.url;
      req.pipe(request(url)).pipe(res);
    });
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
