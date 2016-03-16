(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('jwtContactUsCtrl', jwtContactUsCtrl);

	/*@ngInject*/
	function jwtContactUsCtrl($scope, CommentsService) {
		var vm = this;
		vm.customerName = '';
		vm.message = '';
		vm.emailAddress = '';
		vm.subject = '';

		vm.submit = function ($event) {
			console.log('submit buttton clicked');
			var message = {};

			message.name = vm.customerName;
			message.message = vm.message;
			message.email = vm.emailAddress;
			message.subject = vm.subject;

			CommentsService.saveComment(message)
				.then(function (success) {
					console.log('it worked:', success);
				})
				.catch(function (error) {
					console.log('it failed:', error);
				});
		};
	}

})(angular);
