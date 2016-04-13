(function (app) {
	'use strict';

	app.module('jwt.uploadButton')
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
			link: function (scope, element, attrs, ctrl) {
				var uploadInput = null;
				var uploadCallback = scope.jwtCallback || angular.noop;
				ctrl.uploadLabel = scope.jwtLabel || 'Upload';

				function addUploadElement() {
					if (uploadInput) {
						uploadInput.off('change');
						uploadInput.replaceWith('<input type="file" accept="image/*" size="1">');
					}
					uploadInput = element.find('input');
					uploadInput.on('change', uploadImages);
				}

				function uploadImages($event) {
					uploadCallback(uploadInput[0].files);
					addUploadElement();
				}

				addUploadElement();
			}
		};
	}

})(angular);
