(function(app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('CarsCtrl', CarsCtrl);

  /*@ngInject*/
  function CarsCtrl($scope, $state, CarsService) {
    var vm = this;

    vm.cars = [];
    vm.showList = false;

    function getCars(){
        CarsService.getCars().then(function (cars) {
            vm.cars = cars;
            vm.showList = false;
            if (vm.cars.length > 0) {
              vm.showList = true;
            }
            console.log('cars:', cars);
        }, function (error) {
          vm.showList = false;
            console.log(error);
        });
    }

    getCars();
  }

})(angular);