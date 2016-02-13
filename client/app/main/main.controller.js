'use strict';

angular.module('jwtfrontendApp')
  /*@ngInject*/
  .controller('MainCtrl', function($scope, Restangular) {
    Restangular.one('me').get().then(function(success) {

    }).catch(function (error) {
      
    });
  });
