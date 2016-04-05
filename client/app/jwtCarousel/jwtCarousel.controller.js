(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('jwtCarouselCtrl', jwtCarouselCtrl);

	/*@ngInject*/
	function jwtCarouselCtrl($scope) {
		var vm = this;
		vm.icons = ['accent1.jpg',
			'accent2.jpg', 'accent3.jpg', 'accent4.jpg', 'accent5.jpg', 'accent6.jpg'
		];
		vm.currentImage = './assets/images/' + vm.icons[0];
		vm.selectImage = function ($event, index) {
			vm.currentImage = './assets/images/' + vm.icons[index];
		};
	}

})(angular);
