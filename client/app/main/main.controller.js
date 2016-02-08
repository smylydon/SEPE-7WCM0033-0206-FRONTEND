'use strict';

angular.module('jwtfrontendApp')
  /*@ngInject*/
  .controller('MainCtrl', function($scope, Restangular) {
    console.log('fuck2');
    Restangular.one('me').get().then(function(success) {
      console.log('success ' + success);
    });
    console.log('waiting for Restangular');
  });
