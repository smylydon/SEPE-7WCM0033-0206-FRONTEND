(function(app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('DetailCarCtrl', DetailCarCtrl);

  /*@ngInject*/
  function DetailCarCtrl($scope, $state, $stateParams, CarsService) {
    var vm = this;
    vm.showCar = false;
    vm.car = null;

    function getCar(id){
        CarsService.getACar(id).then(function (car) {
            vm.car = car;
            vm.showCar = false;
            if (vm.car) {
              vm.showCar = true;
            }
            console.log('car:', car);
        }, function (error) {
          vm.showCar = false;
            console.log(error);
        });
    }

    getCar($stateParams.car_id);
  }

})(angular);
