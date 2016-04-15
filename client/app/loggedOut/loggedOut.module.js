'use strict';

angular.module('jwtfrontendApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('loggedOut', {
        url: '/logged-out',
        views: {
          'menuView': {
            templateUrl: 'components/navbar/navbar.tpl.html',
            controller: 'NavbarCtrl',
            controllerAs: 'navbarCtrl'
          },
          'mainView': {
            templateUrl: 'app/loggedOut/loggedOut.tpl.html',
            controller: 'LoggedOutCtrl',
            controllerAs: 'loggedOutCtrl'
          },
          'footerView': {
            templateUrl: 'components/footer/footer.tpl.html',
            controller: 'FooterCtrl',
            controllerAs: 'footerCtrl'
          },
        }
      });
  });
