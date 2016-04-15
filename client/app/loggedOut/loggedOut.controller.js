(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('LoggedOutCtrl', LoggedOutCtrl);

	/*@ngInject*/
	function LoggedOutCtrl($scope, $state, $interval, LoginService) {
		var vm = this;
		var counter = 10;
		vm.count = counter;

		var interval = null;

		function startClock() {
			LoginService.logout()
				.then(function (success) {
					interval = $interval(function () {
						counter--;
						if (counter <= 0) {
							$interval.cancel(interval);
							vm.goHome();
						}
						vm.count = counter;
					}, 1000);
				})
				.catch(function (error) {
					vm.goHome();
				});
		}

		vm.goHome = function ($event) {
			$interval.cancel(interval);
			$state.go('home');
		};

		startClock();

	}

})(angular);
