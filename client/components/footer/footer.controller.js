
(function (app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('FooterCtrl', footerCtrl);

  /*@ngInject*/
  function footerCtrl ($scope, $location, $state, $stateParams) {
    var vm = this;
    console.log('Footer');
  }

})(angular);
