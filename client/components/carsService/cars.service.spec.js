'use strict';

describe('CarsService', function() {
  var CarsService = null;
  var $httpBackend = null;

  // load the controller's module
  //beforeEach(module('jwtfrontendApp'));
  beforeEach(module('services.cars'));

  beforeEach(inject(function($rootScope, _$httpBackend_, _CarsService_) {
    $httpBackend = _$httpBackend_;
    CarsService = _CarsService_;
    $httpBackend.whenGET(/components.*/).respond(200, '');
    $httpBackend.whenGET(/app.*/).respond(200, '');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be possible to get a list of vehicles.', function(done) {

    $httpBackend.when('GET', '/cars')
      .respond(200, {
        success: true,
        message: ''
      });

    CarsService.getCars(1)
      .then(function(success) {
        expect(success.success).toBe(true);
        expect(success.message).toBe('');
      }).catch(function(error) {
        expect(error).toBeUndefined();
      }).finally(done)
    $httpBackend.flush();
  });

  it('should be possible to get one vehicle.', function(done) {

    $httpBackend.when('GET', '/cars/1')
      .respond(200, {
        success: true,
        message: ''
      });

    CarsService.getACar(1)
      .then(function(success) {
        expect(success.success).toBe(true);
        expect(success.message).toBe('');
      }).catch(function(error) {
        expect(error).toBeUndefined();
      }).finally(done)
    $httpBackend.flush();
  });
});
