(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('HomeCtrl', HomeCtrl);

	/*@ngInject*/
	function HomeCtrl($scope, CarsService) {
		var vm = this;
		var dummy = {
			selectedOption: null,
			availableOptions: []
		};

		vm.makes = _.clone(dummy);
		vm.models = _.clone(dummy);

		CarsService.getMakes()
			.then(function (makes) {
				vm.makes.availableOptions = makes;
			})
			.catch(function (error) {
				console.log(error);
			});

		vm.changeMake = function ($event) {
			var makes_id = vm.makes.selectedOption;
			CarsService.getModels(makes_id)
				.then(function (models) {
					vm.models.availableOptions =_.uniq(models,'model');
					console.log(_.uniq(models,'model'));
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}

})(angular);
