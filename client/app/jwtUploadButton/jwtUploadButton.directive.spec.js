'use strict';

describe('Directive: jwtUploadButton', function () {

  // load the directive's module and view
  beforeEach(module('jwtfrontendApp'));
  beforeEach(module('app/jwtUploadButton/jwtUploadButton.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<jwt-upload-button></jwt-upload-button>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});
