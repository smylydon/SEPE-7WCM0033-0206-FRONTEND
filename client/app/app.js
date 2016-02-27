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
    'services.login'
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
