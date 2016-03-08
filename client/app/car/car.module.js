'use strict';

angular.module('jwtfrontendApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('car', {
        url: '/car/:car_id',
        views: {
          'menuView': {
            templateUrl: 'components/navbar/navbar.tpl.html',
            controller: 'NavbarCtrl',
            controllerAs: 'navbarCtrl'
          },
          'mainView': {
            templateUrl: 'app/car/car.tpl.html',
            controller: 'CarCtrl',
            controllerAs: 'carCtrl'
          },
          'footerView': {
            templateUrl: 'components/footer/footer.tpl.html',
            controller: 'FooterCtrl',
            controllerAs: 'footerCtrl'
          },
        }
      });
  });
