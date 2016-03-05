'use strict';

xdescribe('carsService', function() {
  var LoginService = null;
  var passpromise = false;
  var Restangular = null;
  var localStorageService = null;
  var Login,
    $httpBackend;

  // load the controller's module
  beforeEach(module('services.login'));

  beforeEach(inject(function($rootScope, _$httpBackend_, _LoginService_) {
    $httpBackend = _$httpBackend_;
    LoginService = _LoginService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be possible login using email and password', function() {
    $httpBackend.expectPost('/api/login', '{email:test@test.com, password:password}')
      .respond(200);

    LoginService.login({
      email: 'test@test',
      password: 'password'
    });

    $httpBackend.flush();
  });
});
