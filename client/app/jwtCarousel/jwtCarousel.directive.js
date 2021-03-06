'use strict';
(function (app) {
	app.module('jwtfrontendApp')
		.directive('jwtCarousel', jwtCarousel);

	/*@ngInject*/
	function jwtCarousel() {
		return {
			templateUrl: 'app/jwtCarousel/jwtCarousel.tpl.html',
			restrict: 'E',
			replace: true,
			scope: {
				jwtPhotos: '='
			},
			controller: 'jwtCarouselCtrl as carouselCtrl',
			link: function (scope, element, attrs) {}
		};
	}
})(angular);
