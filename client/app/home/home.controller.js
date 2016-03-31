
(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
	  .controller('HomeCtrl', HomeCtrl);

	 /*@ngInject*/
	function HomeCtrl ($scope, CarsService) {
		CarsService.getModels(9);
		CarsService.getYears(9);
	}

})(angular);
