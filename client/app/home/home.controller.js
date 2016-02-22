
(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
	  .controller('HomeCtrl', homeCtrl);

	 /*@ngInject*/
	function homeCtrl ($scope) {
		var vm = this;
/*
		var data = {
		  email: 'guest@abc.com',
		  password: 'password'
		};
		data = $.param(data);
		Restangular.one('login').customPOST(data, undefined, undefined, {
		  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}).then(function(success) {
		  console.log('it worked:', success);
		}).catch(function(error) {
		  console.log('it failed:', error);
	  });
	  */
	}

})(angular);
