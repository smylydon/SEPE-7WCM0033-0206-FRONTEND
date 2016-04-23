(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('CarsCtrl', CarsCtrl);

	/*@ngInject*/
	function CarsCtrl($scope, $state, $q, AclService, CarsModalService, CarsService) {
		var vm = this;
		vm.currentMake = {
			id: 0,
			name: 'All Makes'
		};
		vm.currentModel = {
			id: 0,
			model: 'All Models'
		};
		vm.can = AclService.can;
		vm.cars = [];
		vm.showList = false;
		vm.maxSize = 10;
		vm.currentPage = 1;
		vm.totalCars = 0;
		vm.makes = null;
		vm.models = null;
		vm.makesStatus = {
			isopen: false,
			disabled: false,
		};
		vm.modelsStatus = {
			isopen: false,
			disabled: true
		};
		vm.makesDisabled = function () {
			return vm.makesStatus.disabled;
		};
		vm.modelsDisabled = function () {
			return vm.modelsStatus.disabled;
		};

		function getMakes() {
			vm.makesStatus.disabled = true;
			vm.modelsStatus.disabled = true;
			CarsService.getMakes()
				.then(function (makes) {
					vm.makes = [{
						id: 0,
						name: 'All Makes'
					}];
					vm.makes = vm.makes.concat(_.clone(makes));
					getCars();
				})
				.catch(function (error) {
					getCars();
				})
				.finally(function () {
					vm.makesStatus.disabled = false;
				});
		}

		vm.changeMake = function ($event, makeId) {
			$event.preventDefault();
			var make = _.find(vm.makes, {
				id: makeId
			});

			if (make) {
				vm.makesStatus.disabled = true;
				vm.modelsStatus.disabled = true;
				vm.currentMake = make;
				vm.currentPage = 0;
				CarsService.getModels(makeId)
					.then(function (models) {
						vm.models = [{
							id: 0,
							model: 'All Models'
						}];
						if (models.length > 0) {
							var temp = _.sortBy(_.uniq(_.clone(models), 'model'), 'model');
							vm.models = vm.models.concat(temp);
							vm.modelsStatus.disabled = false;
						}
						vm.currentModel = vm.models[0];
						getCars();
					})
					.catch(function (error) {
						vm.modelsStatus.disabled = true;
					})
					.finally(function () {
						vm.makesStatus.disabled = false;
					});
			}
		};

		vm.changeModel = function ($event, modelId) {
			$event.preventDefault();
			var model = _.find(vm.models, {
				id: modelId
			});

			if (model) {
				vm.currentModel = model;
				vm.currentPage = 0;
				getCars();
			}
		};

		vm.currentPageChanged = function () {
			var page = Math.max((vm.currentPage) - 1, 0);
			getCars(page);
		};

		vm.goSearch = function ($event) {

		};

		function getCars(page) {
			var model = vm.currentModel;
			var setter = {
				offset: page || vm.currentPage || 0,
				makeId: vm.currentMake.id,
			};

			if (model.id !== 0 && _.trim(model.model)
				.length > 0) {
				setter.model = _.trim(model.model);
			}

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
