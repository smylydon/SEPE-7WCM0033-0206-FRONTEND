(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('jwtUploadButtonCtrl', jwtUploadButtonCtrl);

	/*@ngInject*/
	function jwtUploadButtonCtrl($scope, $element) {
		var uploadCallback = $scope.jwtCallback || angular.noop;
		var vm = this;
		var uploadInput = $element.find('input');

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
