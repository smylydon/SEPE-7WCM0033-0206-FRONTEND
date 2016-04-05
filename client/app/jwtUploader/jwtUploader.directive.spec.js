'use strict';

describe('Directive: jwtUploader', function () {

  // load the directive's module and view
  beforeEach(module('jwt.uploadButton'));
  beforeEach(module('app/jwtUploadButton/jwtUploadButton.tpl.html'));
  beforeEach(module('jwt.uploader'));
  beforeEach(module('app/jwtUploader/jwtUploader.tpl.html'));
  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<jwt-uploader></jwt-uploader>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});
