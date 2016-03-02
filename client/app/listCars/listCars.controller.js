(function(app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('ListCarsCtrl', ListCarsCtrl);

  /*@ngInject*/
  function ListCarsCtrl($scope, $state, CarsService) {
    var vm = this;

    vm.cars = [];

    function getCars(){
        CarsService.getCars().then(function (cars) {
            vm.cars = cars;
            console.log('cars:', cars);
        }, function (error) {
            console.log(error);
        });
    }

    getCars();
  }

})(angular);
