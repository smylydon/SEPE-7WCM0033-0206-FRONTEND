(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('NavbarCtrl', navbarCtrl);

	/*@ngInject*/
	function navbarCtrl($scope, $location, $state, $stateParams, LoginService) {
		var vm = this; //jshint ignore:line

		var customerMenu = [{
			'title': 'Buy Car',
			'state': 'home'
		}, {
			'title': 'Service & Repair',
			'state': 'maintain'
		}];

		var staffMenu = [{
			'title': 'Staff',
			'state': 'staff'
		}];
		var adminMenu = [{
			'title': 'Admin',
			'state': 'admin'
		}];

		vm.menu = customerMenu.concat([]);
		vm.isCollapsed = true;

		vm.isActive = function (route) {
			return route === $state.current.name;
		};

		$scope.$watch(function () {
			return LoginService.isLoggedIn();
		}, function (newVal, oldVal) {
			if (newVal) {
				vm.menu = customerMenu.concat(staffMenu);
			}
		});
	}

})(angular);
