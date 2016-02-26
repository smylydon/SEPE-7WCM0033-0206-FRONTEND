
(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
	  .controller('ContactUsCtrl', ContactUsCtrl);


	 /*@ngInject*/
	function ContactUsCtrl ($scope, Restangular) {
		var vm = this;
		vm.customerName = '';
		vm.message = '';
		vm.emailAddress = '';
		vm.subject = '';

		vm.submit = function($event) {
			//$event.stopProgration();
			console.log('submit buttton clicked');
			var message ={};

			if (vm.customerName.length > 2){

			}

			message.name = vm.customerName;
			message.message = vm.message;
			message.email = vm.emailAddress;
			message.subject = vm.subject;

			Restangular.one('comment')
				.customPOST(message).then(function(success) {
			  console.log('it worked:', success);
			}).catch(function(error) {
			  console.log('it failed:', error);
		  });
		}
	}


})(angular);
