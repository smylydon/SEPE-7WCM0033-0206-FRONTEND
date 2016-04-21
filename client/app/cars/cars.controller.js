(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('CarsCtrl', CarsCtrl);

	/*@ngInject*/
	function CarsCtrl($scope, $state, $q, AclService, CarsModalService, CarsService) {
		var vm = this;
		var dummy = {
			selectedOption: null,
			availableOptions: []
		};
		vm.can = AclService.can;
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
			var makesId = vm.makes.selectedOption;
			CarsService.getModels(makesId)
				.then(function (models) {
					vm.models.availableOptions = _.uniq(models, 'model');
				})
				.catch(function (error) {
					console.log(error);
				});
		};

		vm.currentPageChanged = function () {
			var page = Math.max((vm.currentPage) - 1, 0);
			getCars(page);
		};

		vm.goSearch = function ($event) {

		};

		function getCars(page) {
			var setter = {
				offset: page || 0
			};

			CarsService.getCars(setter)
				.then(function (cars) {
					vm.cars = [];
					vm.showList = false;
					vm.totalCars = 0;
					if (cars && _.isArray(cars.rows) && cars.rows.length > 0) {
						vm.cars = cars.rows;
						vm.totalCars = cars.count;
						vm.showList = true;
						_.forEach(cars.rows, function (car) {
							if (_.isArray(car.images) && car.images.length > 0) {
								car.images = _.map(car.images, function (image) {
									return image.path;
								});
							} else {
								car.images = ['./images/default/ghostVehicleLarge.jpg'];
							}
						});
					}
				}, function (error) {
					vm.cars = [];
					vm.showList = false;
					vm.totalCars = 0;
				});
		}

		function editCar(car) {
			var oldCar = car;
			var newCar = null;
			if (car) {
				CarsModalService.showModal(car)
					.then(function (close) {
						if (close.save && close.newCar) {
							newCar = _.cloneDeep(close.newCar);
							return CarsService.updateCar(close.newCar);
						} else {
							return $q.reject('cancelled');
						}
					})
					.then(function (done) {
						//jshint ignore:start
						car.licence_plate = newCar.licence_plate;
						car.model = newCar.model;
						car.make = newCar.make;
						car.make_id = newCar.make_id;
						car.mileage = newCar.mileage;
						car.year = newCar.year;
						car.chassis_number = newCar.chassis_number;
						car.description = newCar.description;
						car.updated_at = newCar.updated_at;
						car.body_type = newCar.body_type;
						car.transmission = newCar.transmission;
						//jshint ignore:end
					})
					.catch(function (error) {
						//car = oldCar;
					});
			}
		}

		vm.carPicked = function ($event, carId) {
			var car = _.find(vm.cars, {
				id: carId
			});
			if (car) {
				editCar(car);
			}
		};

		getMakes();
	}

})(angular);
