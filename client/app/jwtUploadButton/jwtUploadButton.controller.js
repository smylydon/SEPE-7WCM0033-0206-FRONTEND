(function (app) {
	'use strict';

	app.module('jwt.uploadButton',[])
		.controller('jwtUploadButtonCtrl', jwtUploadButtonCtrl);

	/*@ngInject*/
	function jwtUploadButtonCtrl($scope, $element) {
		var vm = this;//jshint ignore:line
		var uploadInput = $element.find('input');
		var uploadCallback = $scope.jwtCallback || angular.noop;
		vm.uploadLabel = $scope.jwtLabel || 'Upload';

		console.log('my input is:', $scope.jwtLabel);
		$element.bind('change', uploadImages);

		function uploadImages($event) {
			var files = uploadInput[0].files;
			console.log('files changed:', files);
			uploadCallback(files);
		}
	}

})(angular);
