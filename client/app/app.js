'use strict';

angular.module('jwtfrontendApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'restangular',
		'ui.router',
		'ui.bootstrap',
		'ng-acl',
		'LocalStorageModule',
		'restangular',
		'services.cars',
		'services.login',
		'services.comments',
		'services.commentsModal',
		'services.upload'
	])
	/*@ngInject*/
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
	})
	/*@ngInject*/
	.config(function (localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix('jwtfrontendApp');
		localStorageServiceProvider.setStorageType('localStorage');
	})
	/*@ngInject*/
	.config(function (RestangularProvider) {
		RestangularProvider.setBaseUrl('http://localhost:8000/api');
	})
	/*@ngInject*/
	.run(function (AclService, localStorageService) {

		AclService.addRole('guest');
		AclService.addRole('salesperson', 'guest');
		AclService.addRole('manager', 'salesperson');
		AclService.addRole('administrator', 'manager');

		AclService.addResource('Comments');

		AclService.allow('salesperson', 'Comments');

		var authorization = localStorageService.get('authorization');
		var userIdentity = {
			roles: ['guest'],
			getRoles: function () {
				return this.roles;
			}
		};
		if (!authorization) {
			authorization = ['guest'];
			localStorageService.set('user', authorization);
		}
		userIdentity.roles = authorization;
		console.log('adding roles:', userIdentity, userIdentity.roles);
		AclService.setUserIdentity(userIdentity);

	})
	/*@ngInject*/
	.run(function ($rootScope, $state) {
		console.log('run stateChangeError');
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			if (error === 'Unauthorized') {
				$state.go('login');
				event.preventDefault();
			}
		});
	})
	/*@ngInject*/
	.run(function (Restangular, localStorageService) {
		console.log('run block setDefaultHeaders');
		Restangular.setDefaultHeaders({
			Authorization: 'Bearer ' + localStorageService.get('token')
		});
	});
