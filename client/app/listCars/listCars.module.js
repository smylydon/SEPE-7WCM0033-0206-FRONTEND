'use strict';

angular.module('jwtfrontendApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('listCars', {
        url: '/list-cars/:car_id',
        views: {
          'menuView': {
            templateUrl: 'components/navbar/navbar.tpl.html',
            controller: 'NavbarCtrl',
            controllerAs: 'navbarCtrl'
          },
          'mainView': {
            templateUrl: 'app/listCars/listCars.tpl.html',
            controller: 'ListCarsCtrl',
            controllerAs: 'listCarsCtrl'
          },
          'footerView': {
            templateUrl: 'components/footer/footer.tpl.html',
            controller: 'FooterCtrl',
            controllerAs: 'footerCtrl'
          },
        }
      });
  });
