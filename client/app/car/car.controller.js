(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('CarCtrl', CarCtrl);

	/*@ngInject*/
	function CarCtrl($scope, $state, $stateParams, CarsModalService, CarsService) {
		var vm = this;
		vm.showCar = false;
		vm.car = null;

		vm.uploadImage = function () {
			console.log('uploadImage clicked');
		};

		function getCar(id) {
			CarsService.getACar(id)
				.then(function (car) {
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

		vm.editCar = function ($event) {
			if (vm.car) {
				CarsModalService.showModal(vm.car);
			}
		};

		getCar($stateParams.car_id); //jshint ignore:line
	}

})(angular);
