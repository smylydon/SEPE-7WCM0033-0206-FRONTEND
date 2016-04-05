(function (app) {
	'use strict';

	app.module('jwt.uploader')
		.directive('jwtUploader', jwtUploader);

	/*@ngInject*/
	function jwtUploader() {
		return {
			templateUrl: 'app/jwtUploader/jwtUploader.tpl.html',
			restrict: 'E',
			replace: true,
			scope: {
				jwtCallback: '=',
				jwtLabel: '='
			},
			controller: 'jwtUploaderCtrl as uploaderCtrl',
			link: function (scope, element, attrs) {}
		};
	}
})(angular);
