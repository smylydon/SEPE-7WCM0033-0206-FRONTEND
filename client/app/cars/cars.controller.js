(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('CarsCtrl', CarsCtrl);

	/*@ngInject*/
	function CarsCtrl($scope, $state, CarsService) {
		var vm = this;
		var dummy = {
			selectedOption: null,
			availableOptions: []
		};

		vm.cars = [];
		vm.showList = false;
		vm.maxSize = 10;
		vm.currentPage = 1;
		vm.totalCars = 0;

		vm.makes = _.clone(dummy);
		vm.models = _.clone(dummy);

		function getMakes() {
			CarsService.getMakes()
				.then(function (makes) {
					vm.makes.availableOptions = makes;
					getCars();
				})
				.catch(function (error) {
					console.log(error);
					getCars();
				});
		}

		vm.changeMake = function ($event) {
			var makes_id = vm.makes.selectedOption;
			CarsService.getModels(makes_id)
				.then(function (models) {
					vm.models.availableOptions = _.uniq(models, 'model');
					console.log(_.uniq(models, 'model'));
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		vm.currentPageChanged = function () {
			var page = Math.max((vm.currentPage)-1, 0);
			console.log('getPage:', page);
			getCars(page);
		};

		vm.goSearch = function ($event) {

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
						console.log('totalCars:', cars.count, vm.maxSize);
					}
				}, function (error) {
					vm.showList = false;
				});
		}

		getMakes();
	}

})(angular);
