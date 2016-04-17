'use strict';

describe('Directive: jwtThumbnail', function () {

	// load the directive's module and view
	beforeEach(module('jwt.Thumbnail'));
	beforeEach(module('app/jwtThumbnail/jwtThumbnail.tpl.html'));

	var element, scope;
	var image = "f84430c6abbe482ce96391d891eb88a6";

	describe('Check to see if it uses placeholder image.', function () {
		beforeEach(inject(function ($rootScope, $compile, $controller) {
			scope = $rootScope.$new();

			element = angular.element('<div><jwt-thumbnail></jwt-thumbnail></div>');
			element = $compile(element)(scope);
			scope.$digest();
		}));

		it('should point to a placeholder image', function () {
			var img = element.find('img');
			expect(img)
				.toBeDefined();
			expect(img.attr('src'))
				.toEqual('./images/default/ghostVehicleLarge.jpg');
		});
	});

	xdescribe('Check to see if it fetches image.', function () {
		beforeEach(inject(function ($rootScope, $compile, $controller) {
			scope = $rootScope.$new();
      element = '<div><jwt-thumbnail jwt-image="' + image + '"></jwt-thumbnail></div>';
			element = angular.element(element);
			element = $compile(element)(scope);
			scope.$digest();
		}));

		it('should point to a placeholder image', function () {
			var img = element.find('img');
			expect(img)
				.toBeDefined();
			expect(img.attr('src'))
				.toEqual(image);
		});
	});
});
