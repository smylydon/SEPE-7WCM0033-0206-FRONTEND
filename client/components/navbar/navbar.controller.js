
(function (app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('NavbarCtrl', navbarCtrl);

  /*@ngInject*/
  function navbarCtrl ($scope, $location, $state, $stateParams) {
    var vm = this;

    vm.menu = [{
      'title': 'Home',
      'state': 'home'
    },{
      'title': 'About Us',
      'state': 'about'
    },{
      'title': 'Legal',
      'state': 'legal'
    },
    {
      'title': 'Contact Us',
      'state': 'contact'
    }];

    vm.isCollapsed = true;

    vm.isActive = function (route) {
      return route === $state.current.name;
    };
  }

})(angular);
