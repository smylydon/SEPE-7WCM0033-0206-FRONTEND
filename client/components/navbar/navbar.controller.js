
(function (app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('NavbarCtrl', navbarCtrl);

  /*@ngInject*/
  function navbarCtrl ($scope, $location, $state, $stateParams) {
    var vm = this;

    vm.menu = [{
      'title': 'Buy Car',
      'state': 'home'
    },{
      'title': 'Service & Repair',
      'state': 'maintain'
    }];

    vm.isCollapsed = true;

    vm.isActive = function (route) {
      return route === $state.current.name;
    };
  }

})(angular);
