(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.directive('jwtContactUs', ContactUs);

	/*@ngInject*/
	function ContactUs() {
		return {
			templateUrl: 'app/jwtContactUs/jwtContactUs.tpl.html',
			restrict: 'E',
			replace: true,
			controller: 'jwtContactUsCtrl as contactCtrl',
			link: function (scope, element, attrs) {}
		};
	}

})(angular);
