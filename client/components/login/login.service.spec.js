'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(function() {
    module('frontendCwApp');

    inject(function(_$httpBackend_, _LoginService_, $rootScope) {
      $httpBackend = _$httpBackend_;

      scope = $rootScope.$new();
    });
  });

  var LoginService,
    scope,
    $httpBackend;

  it('should login using email and password', function() {
    $httpBackend.expectPost('/api/login','{email=test@test.com, password=password}')
      .respond(200);
      Login.post({email='test@test', password="password"});
    $httpBackend.flush();
  });
});
