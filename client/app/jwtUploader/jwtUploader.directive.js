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
			link: function (scope, element, attrs) {
				function dragEnter($event) {
					console.log('dragEnter');
				}

				function dragDrop($event) {
					//$event.stopPropagation();
					$event.preventDefault();
					console.log('===========drop');
				}

				function dragOver($event) {
					console.log('dragOver');
				}

				function cleanUp($event) {
					console.log('cleanUp');
					element.off(dragEnter);
					element.off(dragOver);
					element.off(dragDrop);
				}

				element.on('dragenter', dragEnter);
				element.on('dragdrop', dragDrop);
				element.on('dragover', dragOver);
				scope.$on('$destory', cleanUp);
			}
		};
	}
})(angular);
