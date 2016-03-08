'use strict';

angular.module('jwtfrontendApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('cars', {
        url: '/cars/:car_id',
        views: {
          'menuView': {
            templateUrl: 'components/navbar/navbar.tpl.html',
            controller: 'NavbarCtrl',
            controllerAs: 'navbarCtrl'
          },
          'mainView': {
            templateUrl: 'app/cars/cars.tpl.html',
            controller: 'CarsCtrl',
            controllerAs: 'carsCtrl'
          },
          'footerView': {
            templateUrl: 'components/footer/footer.tpl.html',
            controller: 'FooterCtrl',
            controllerAs: 'footerCtrl'
          },
        }
      });
  });
