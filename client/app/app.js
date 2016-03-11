'use strict';

angular.module('jwtfrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule',
    'restangular',
    'services.cars',
    'services.login',
    'services.comments',
    'services.commentsModal'
  ])
  /*@ngInject*/
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  /*@ngInject*/
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('jwtfrontendApp');
    localStorageServiceProvider.setStorageType('localStorage');
  })
  /*@ngInject*/
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:8000/api');
  })
  /*@ngInject*/
  .run(function($rootScope, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !LoginService.isLoggedIn()) {
        $state.go('login');
        event.preventDefault();
      }
    });
  })
  /*@ngInject*/
  .run(function(Restangular, localStorageService) {
    Restangular.setDefaultHeaders({
      Authorization: 'Bearer ' + localStorageService.get('token')
    });
  })
