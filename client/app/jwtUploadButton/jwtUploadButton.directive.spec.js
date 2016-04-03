'use strict';

describe('Directive: jwtUploadButton', function () {

	// load the directive's module and view
	beforeEach(module('jwtfrontendApp'));
	beforeEach(module('app/jwtUploadButton/jwtUploadButton.tpl.html'));

	var element, scope, controller;
	var data;

	beforeEach(inject(function ($rootScope, $compile, $controller) {
		scope = $rootScope.$new();

		scope.jwtLabel = 'hello';
		scope.jwtCallback = function () {};

		element = angular.element('<jwt-upload-button jwt-label="\'Upload Test\'"></jwt-upload-button>');
		element = $compile(element)(scope);
		scope.$digest();
	}));

	it('should set label to "Upload Test"', function () {
    console.log('element:', element[0]);
		expect(element[0])
			.toContain('Upload Test');
	});
});
