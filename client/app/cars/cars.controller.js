(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('CarsCtrl', CarsCtrl);

	/*@ngInject*/
	function CarsCtrl($scope, $state, CarsService) {
		var vm = this;

		vm.cars = [];
		vm.showList = false;
		vm.getPage = function (page) {
			console.log('getPage:', page);
			getCars(page);
		};

		function getCars(page) {
			var setter = {
				offset: page || 0
			}
			CarsService.getCars(setter)
				.then(function (cars) {
					vm.cars = cars;
					vm.showList = false;
					if (cars && cars.rows.length > 0) {
						vm.cars = cars.rows;
						vm.totalCars = cars.count;
						vm.showList = true;
					}
				}, function (error) {
					vm.showList = false;
				});
		}

		getCars();
	}

})(angular);
