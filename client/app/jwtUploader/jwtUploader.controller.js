(function (app) {
	'use strict';

	app.module('jwt.uploader', ['jwt.uploadButton'])
		.controller('jwtUploaderCtrl', jwtUploaderCtrl);

	/*@ngInject*/
	function jwtUploaderCtrl($scope, $element) {
		var vm = this; //jshint ignore:line
		var uploadCallback = $scope.jwtCallback || angular.noop;
		vm.uploadLabel = $scope.jwtLabel || 'Upload Picture';

		vm.uploadImages = function (files) {
			uploadCallback(files);
		};
	}

})(angular);
