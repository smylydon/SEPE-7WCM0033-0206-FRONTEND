(function (app) {
	'use strict';
//https://developer.mozilla.org/en-US/docs/Web/Events/drop
//https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications

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
			link: function (scope, element, attrs) {
				function dragEnter($event) {

				}

				function dragDrop($event) {
					$event.stopPropagation();
					$event.preventDefault();
					var dt = $event.originalEvent.dataTransfer;
					var files = dt.files;
					scope.uploaderCtrl.uploadImages(files);
				}

				function dragOver($event) {
					$event.preventDefault();

				}

				function cleanUp($event) {
					element.off(dragEnter);
					element.off(dragOver);
					element.off(dragDrop);
				}

				element.on('dragenter', dragEnter);
				element.on('drop', dragDrop);
				element.on('dragover', dragOver);
				scope.$on('$destory', cleanUp);
			}
		};
	}
})(angular);
