
(function (app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('FooterCtrl', footerCtrl);

  /*@ngInject*/
  function footerCtrl ($scope, $location, $state, $stateParams) {
    console.log('Footer');
  }

})(angular);
