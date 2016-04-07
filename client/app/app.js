(function (app) {
	'use strict';

	app.module('jwtfrontendApp', [
			'ngAnimate',
			'ngCookies',
			//'ngProgress',
			'ngResource',
			'ngSanitize',
			'ngToast',
			'restangular',
			'ui.router',
			'ui.bootstrap',
			'ui.tinymce',
			'ng-acl',
			'LocalStorageModule',
			'restangular',
			'services.cars',
			'services.login',
			'services.comments',
			'services.people',
			'services.upload',
			'services.carsModal',
			'services.commentsModal',
			'jwt.uploader'
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
			AclService.addResource('makes');
			AclService.addResource('people');

			AclService.allow('guest', 'car', 'get');
			AclService.allow('guest', 'cars', 'get');
			AclService.allow('guest', 'makes', 'get');
			AclService.allow('guest', 'comments', 'post');

			AclService.allow('salesperson', 'car', 'sell');
			AclService.allow('salesperson', 'people', 'post');
			AclService.allow('salesperson', 'people', 'put');
			AclService.allow('salesperson', 'people', 'get');

			AclService.allow('salesperson', 'comments');
			AclService.allow('salesperson', 'car', 'post');
			AclService.allow('salesperson', 'car', 'put');

			AclService.allow('manager', 'car', 'delete');

			AclService.allow('administrator', 'car', 'uploadpix');
			AclService.allow('administrator', 'people', 'delete');

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

})(angular);
