'use strict';

angular.module('jwtfrontendApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('legal', {
        url: '/legal',
        views: {
          'menuView': {
            templateUrl: 'components/navbar/navbar.tpl.html',
            controller: 'NavbarCtrl',
            controllerAs: 'navbarCtrl'
          },
          'mainView': {
            templateUrl: 'app/legal/legal.tpl.html',
            controller: 'LegalCtrl',
            controllerAs: 'legalCtrl'
          },
          'footerView': {
            templateUrl: 'components/footer/footer.tpl.html',
            controller: 'FooterCtrl',
            controllerAs: 'footerCtrl'
          },
        }
      });
  });
