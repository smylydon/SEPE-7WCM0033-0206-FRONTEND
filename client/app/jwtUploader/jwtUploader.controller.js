(function (app) {
	'use strict';

	app.module('jwt.uploader',['jwt.uploadButton'])
		.controller('jwtUploaderCtrl', jwtUploaderCtrl);

	/*@ngInject*/
	function jwtUploaderCtrl($scope, $element) {
		var uploadCallback = $scope.jwtCallback || angular.noop;
		var vm = this;
		var uploadInput = $element.find('input');

		vm.uploadLabel = $scope.jwtLabel || 'Upload';

		console.log('jwtUploaderCtrl :', $scope.jwtLabel);
		$element.bind('change', uploadImages);

		function uploadImages($event) {
			var files = uploadInput[0].files;
			console.log('files changed:', files);
			uploadCallback(files);
		}
	}

})(angular);
