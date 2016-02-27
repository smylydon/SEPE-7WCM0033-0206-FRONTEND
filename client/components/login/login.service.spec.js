/*
'use strict';

describe('LoginService', function() {
  var LoginService = null;
  // load the controller's module
  beforeEach(function() {
    module('services.login');
    inject(function(_$httpBackend_, _LoginService_) {
      $httpBackend = _$httpBackend_;
      LoginService = _LoginService_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var Login,
    $httpBackend;

  it('should login using email and password', function() {
    $httpBackend.expectPost('/api/login', '{email:test@test.com, password:password}')
      .respond(200);

    LoginService.login({
      email: 'test@test',
      password: 'password'
    });

    $httpBackend.flush();
  });
});
*/
