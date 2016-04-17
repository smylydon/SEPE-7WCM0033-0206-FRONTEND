(function (app) {
	'use strict';

	app.module('jwt.Thumbnail')
		.directive('jwtThumbnail', Thumbnail);

	/*@ngInject*/
	function Thumbnail() {
		return {
			templateUrl: 'app/jwtThumbnail/jwtThumbnail.tpl.html',
			restrict: 'E',
			replace: true,
			scope: {
				jwtImage: '='
			},
			controller: 'jwtThumbnailCtrl as thumbnailCtrl',
			link: function (scope, element, attrs) {}
		};
	}

})(angular);
