'use strict';

describe('CarsService', function () {
	var CarsService = null;
	var $httpBackend = null;

	function setUp($rootScope, _$httpBackend_, _CarsService_) {
		$httpBackend = _$httpBackend_;
		CarsService = _CarsService_;
		$httpBackend.whenGET(/components.*/)
			.respond(200, '');
		$httpBackend.whenGET(/app.*/)
			.respond(200, '');
	}

	function cleanUp() {
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}

	describe('CarsService:getCars', function () {
		// load the controller's module
		beforeEach(module('services.cars'));
		beforeEach(inject(setUp));
		afterEach(cleanUp);

		it('should be possible to get a list of vehicles.', function (done) {
			$httpBackend.when('GET', '/cars')
				.respond(200, {
					success: true,
					message: 'success'
				});

			CarsService.getCars()
				.then(function (success) {
					expect(success.success)
						.toBe(true);
					expect(success.message)
						.toBe('success');
				})
				.catch(function (error) {
					fail('Catch should not be called');
				})
				.finally(done)
		});

		it('should catch errors from the backend.', function (done) {
			$httpBackend.when('GET', '/cars')
				.respond(200, {
					success: false,
					message: 'error'
				});

			CarsService.getCars()
				.then(function (success) {
					expect(success.success)
						.toBe(false);
					expect(success.message)
						.toBe('error');
				})
				.catch(function (error) {
					fail('Catch should not be called');
				})
				.finally(done)
		});

		it('should catch server errors.', function (done) {
			$httpBackend.when('GET', '/cars')
				.respond(404, {
					success: false,
					message: 'error'
				});

			CarsService.getCars()
				.then(function (success) {
					fail('Success should not be called');
				})
				.catch(function (error) {
					expect(error)
						.toBeDefined();
				})
				.finally(done)
		});
	});

	describe('CarsService:getACar', function () {
		// load the controller's module
		beforeEach(module('services.cars'));
		beforeEach(inject(setUp));
		afterEach(cleanUp);

		it('should be possible to get one vehicle.', function (done) {
			$httpBackend.when('GET', '/cars/1')
				.respond(200, {
					success: true,
					message: 'success'
				});

			CarsService.getACar(1)
				.then(function (success) {
					expect(success.success)
						.toBe(true);
					expect(success.message)
						.toBe('success');
				})
				.catch(function (error) {
					fail('Catch should not be called');
				})
				.finally(done)
		});

		it('should catch errors from the backend.', function (done) {
			$httpBackend.when('GET', '/cars/1')
				.respond(200, {
					success: false,
					message: 'error'
				});

			CarsService.getACar(1)
				.then(function (success) {
					expect(success.success)
						.toBe(false);
					expect(success.message)
						.toBe('error');
				})
				.catch(function (error) {
					fail('Catch should not be called');
				})
				.finally(done)
		});

		it('should catch server errors.', function (done) {
			$httpBackend.when('GET', '/cars/1')
				.respond(400, {
					success: false,
					message: 'error'
				});

			CarsService.getACar(1)
				.then(function (success) {
					fail('Success should not be called');
				})
				.catch(function (error) {
					expect(error)
						.toBeDefined();
				})
				.finally(done)
		});
	});

});
