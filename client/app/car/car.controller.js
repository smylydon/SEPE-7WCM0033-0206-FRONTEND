(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('CarCtrl', CarCtrl);

	/*@ngInject*/
	function CarCtrl($scope, $state, $stateParams, $q, CarsModalService, CarsService) {
		var vm = this;
		vm.showCar = false;
		vm.car = null;
		vm.images = [];

		vm.uploadImage = function () {
			console.log('uploadImage clicked');
		};

		function getCar(id) {
			CarsService.getACar(id)
				.then(function (car) {
					vm.images = [];
					vm.car = car;
					vm.showCar = false;
					console.log('car is:', car);
					if (vm.car) {
						vm.showCar = true;
						vm.images = vm.car.images;
						vm.images = _.map(vm.images, function (image) {
							return image.path;
						});
					}
				}, function (error) {
					vm.showCar = false;
				});
		}

		vm.editCar = function ($event) {
			var oldCar = vm.car;
			var newCar = null;
			if (vm.car) {
				CarsModalService.showModal(vm.car)
				.then(function(close) {
					if (close.save && close.newCar) {
						newCar = close.newCar.clone();
						return close.newCar.save();
					} else {
						return $q.reject('cancelled');
					}
				}).then(function (car) {
					vm.car = newCar;
				}).catch(function(error) {
						vm.car = oldCar;
				});
			}
		};

		getCar($stateParams.car_id); //jshint ignore:line
	}

})(angular);
