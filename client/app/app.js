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
			'services.authorization',
			'services.cars',
			'services.login',
			'services.comments',
			'services.people',
			'services.upload',
			'services.carsModal',
			'services.commentsModal',
			'jwt.uploader',
			'jwt.Thumbnail'
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
		.run(function (AuthorizationService) {
			AuthorizationService.authorize();
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
