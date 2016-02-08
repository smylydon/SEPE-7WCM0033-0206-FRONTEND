'use strict';

(function(app) {
  app.module('jwtfrontendApp')
    .config(function($stateProvider) {
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
        });

    });
})(angular);
