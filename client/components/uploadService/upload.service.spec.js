/*'use strict';

describe('LoginService', function() {
  var LoginService = null;
  var $httpBackend = null;

  // load the controller's module
  beforeEach(module('jwtfrontendApp'));
  //beforeEach(module('restangular'));
  beforeEach(module('services.login'));

  beforeEach(inject(function($rootScope, _$httpBackend_, _LoginService_) {
    $httpBackend = _$httpBackend_;
    LoginService = _LoginService_;*/
    //$httpBackend.whenGET(/components.*/).respond(200, '');
    //$httpBackend.whenGET(/app.*/).respond(200, '');
  //}));
/*
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be possible login using email and password', function() {
    LoginService.login({
      "email": "test@test.com",
      "password": "password"
    });

    $httpBackend.when('POST', 'http://localhost:8000/api/login', '{"email":"test@test.com","password":"password"}')
      .respond({
        success: true,
        message: '',
        token: 123
      });

    $httpBackend.flush();
    expect(LoginService.isLoggedIn()).toBe(true);
  });
});
*/
