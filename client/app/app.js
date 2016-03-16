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


		AclService.addResource('car');
		AclService.addResource('cars');
		AclService.addResource('comments');

		AclService.allow('guest', 'car', 'get');
		AclService.allow('salesperson', 'car', 'sell');
		AclService.allow('manager', 'car', 'put');
		AclService.allow('administrator', 'car', 'post');
		AclService.allow('administrator', 'car', 'uploadpix');
		AclService.allow('guest', 'comments', 'post');
		AclService.allow('salesperson', 'comments');

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
		AclService.setUserIdentity(userIdentity);
	})
	/*@ngInject*/
	.run(function ($rootScope, $state) {
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			if (error === 'Unauthorized') {
				$state.go('login');
				event.preventDefault();
			}
		});
	})
	/*@ngInject*/
	.run(function (Restangular, localStorageService) {
		Restangular.setDefaultHeaders({
			Authorization: 'Bearer ' + localStorageService.get('token')
		});
	});
