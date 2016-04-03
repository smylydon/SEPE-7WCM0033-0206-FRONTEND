(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.directive('jwtUploadButton', UploadButton);

	/*@ngInject*/
	function UploadButton() {
		return {
			templateUrl: 'app/jwtUploadButton/jwtUploadButton.tpl.html',
			restrict: 'E',
			replace: true,
			scope: {
				jwtCallback: '=',
				jwtLabel: '='
			},
			controller: 'jwtUploadButtonCtrl as uploadButtonCtrl',
			link: function (scope, element, attrs) {
				console.log('link function');
			}
		};
	}

})(angular);
