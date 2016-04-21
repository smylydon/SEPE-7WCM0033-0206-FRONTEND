'use strict';

describe('Controller: CarsCtrl', function () {
	var CarsCtrl, deferred, doReject, returnData,
		scope, $q, $httpBackend;
    var carsCollection = {"count":24,"rows":[{"id":1,"model":"Accent","year":2010,"milage":"110000","chassis_number":"HYUKHX8WEDX","licence_plate":"FTHTPVWC","body_type":"Hatchback","description":"Aasdjfas ad asdkf asdlf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.975Z","updated_at":"2016-04-20T03:17:21.975Z","deleted_at":null,"make_id":9,"make":{"id":9,"name":"Hyundai","created_at":"2016-04-20T03:17:21.674Z","updated_at":"2016-04-20T03:17:21.674Z","deleted_at":null},"images":[]},{"id":2,"model":"Accent","year":2010,"milage":"120000","chassis_number":"HYUY3F0I2JZ","licence_plate":"5F8R74NU","body_type":"Coupe","description":"Aasdjfas ad asdkf asdlf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.977Z","updated_at":"2016-04-20T03:17:21.977Z","deleted_at":null,"make_id":9,"make":{"id":9,"name":"Hyundai","created_at":"2016-04-20T03:17:21.674Z","updated_at":"2016-04-20T03:17:21.674Z","deleted_at":null},"images":[]},{"id":3,"model":"Accent","year":2009,"milage":"110000","chassis_number":"HYUMHVZEJNX","licence_plate":"2GI6XWPF","body_type":"Hatchback","description":"Aasdjfas ad asdkf asdlf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.976Z","updated_at":"2016-04-20T03:17:21.976Z","deleted_at":null,"make_id":9,"make":{"id":9,"name":"Hyundai","created_at":"2016-04-20T03:17:21.674Z","updated_at":"2016-04-20T03:17:21.674Z","deleted_at":null},"images":[]},{"id":4,"model":"Focus","year":2009,"milage":"135000","chassis_number":"FORBUAGKUBT","licence_plate":"GBT9DWJ5","body_type":"Hatchback","description":"Adlkfas asldkf Olkasd asodf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.978Z","updated_at":"2016-04-20T03:17:21.978Z","deleted_at":null,"make_id":7,"make":{"id":7,"name":"Ford","created_at":"2016-04-20T03:17:21.669Z","updated_at":"2016-04-20T03:17:21.669Z","deleted_at":null},"images":[]},{"id":5,"model":"F250","year":2009,"milage":"160000","chassis_number":"FOR1DHHJXBQ","licence_plate":"3OYPW9DN","body_type":"Pickup","description":"Adlkfas asldkf Olkasd asodf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.978Z","updated_at":"2016-04-20T03:17:21.978Z","deleted_at":null,"make_id":7,"make":{"id":7,"name":"Ford","created_at":"2016-04-20T03:17:21.669Z","updated_at":"2016-04-20T03:17:21.669Z","deleted_at":null},"images":[]},{"id":6,"model":"F450","year":2011,"milage":"60000","chassis_number":"FORQYM5C3PR","licence_plate":"BIPADHEZ","body_type":"Pickup","description":"Adlkfas asldkf Olkasd asodf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.978Z","updated_at":"2016-04-20T03:17:21.978Z","deleted_at":null,"make_id":7,"make":{"id":7,"name":"Ford","created_at":"2016-04-20T03:17:21.669Z","updated_at":"2016-04-20T03:17:21.669Z","deleted_at":null},"images":[]},{"id":7,"model":"Explorer","year":2011,"milage":"150000","chassis_number":"FORESAGBMQN","licence_plate":"ISUPZTVP","body_type":"SUV","description":"Adlkfas asldkf Olkasd asodf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.979Z","updated_at":"2016-04-20T03:17:21.979Z","deleted_at":null,"make_id":7,"make":{"id":7,"name":"Ford","created_at":"2016-04-20T03:17:21.669Z","updated_at":"2016-04-20T03:17:21.669Z","deleted_at":null},"images":[]},{"id":8,"model":"Expedition","year":2012,"milage":"100000","chassis_number":"FOROUYNQQ43","licence_plate":"NQOKBJRY","body_type":"SUV","description":"Adlkfas asldkf Olkasd asodf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.979Z","updated_at":"2016-04-20T03:17:21.979Z","deleted_at":null,"make_id":7,"make":{"id":7,"name":"Ford","created_at":"2016-04-20T03:17:21.669Z","updated_at":"2016-04-20T03:17:21.669Z","deleted_at":null},"images":[]},{"id":9,"model":"Carolla","year":2013,"milage":"30000","chassis_number":"TOY0FPE5EGK","licence_plate":"POE3H98M","body_type":"Coupe","description":"Adlkfas asldkf Olkasd asodf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.980Z","updated_at":"2016-04-20T03:17:21.980Z","deleted_at":null,"make_id":19,"make":{"id":19,"name":"Toyota","created_at":"2016-04-20T03:17:21.720Z","updated_at":"2016-04-20T03:17:21.720Z","deleted_at":null},"images":[]},{"id":10,"model":"Camry","year":2014,"milage":"30000","chassis_number":"TOY7IIAUSKV","licence_plate":"K97SSFPF","body_type":"Coupe","description":"Adlkfas asldkf Olkasd asodf","transmission":null,"drive":null,"created_at":"2016-04-20T03:17:21.980Z","updated_at":"2016-04-20T03:17:21.980Z","deleted_at":null,"make_id":19,"make":{"id":19,"name":"Toyota","created_at":"2016-04-20T03:17:21.720Z","updated_at":"2016-04-20T03:17:21.720Z","deleted_at":null},"images":[]}]};

	function setUp(_$httpBackend_, _$q_, $controller, $rootScope) {
		$httpBackend = _$httpBackend_;
		$q = _$q_;
		scope = $rootScope.$new();
		CarsCtrl = $controller('CarsCtrl as carsCtrl', {
			$scope: scope
		});

		$httpBackend.whenGET(/components.*/)
			.respond(200, '');
		$httpBackend.whenGET(/app.*/)
			.respond(200, '');

		scope.$apply();
	}

	function cleanUp() {
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}

	// load the controller's module
	beforeEach(module('jwtfrontendApp'));
	beforeEach(module(function ($provide) {

		$provide.service('CarsService', function () {
			this.getCars = function () {
				if (doReject) {
					return $q.reject('Error');
				} else {
					var value = [];
					if (returnData) {
						value = _.cloneDeep(carsCollection);
					}
					return $q.resolve(value);
				}
			};

			this.getMakes = function () {
				return $q.resolve({});
			};
		});

	}));

	describe('CarsService returns NO data.', function () {
		beforeEach(function () {
			doReject = false;
      returnData = false;
		});

		// Initialize the controller and a mock scope
		beforeEach(inject(setUp));

		afterEach(cleanUp);

		it('should get 0 cars.', function () {
			expect(CarsCtrl.cars.length)
				.toEqual(0);
		});

		it('should have a total of 0 cars.', function () {
			expect(CarsCtrl.totalCars)
				.toEqual(0);
		});

		it('should set showList to false', function () {
			expect(CarsCtrl.showList)
				.toBe(false);
		});

	});

	describe('CarsService returns data.', function () {
		beforeEach(function () {
			returnData = true;
			doReject = false;
		});
		// Initialize the controller and a mock scope
		beforeEach(inject(setUp));

		afterEach(cleanUp);

		it('should get 10 cars.', function () {
			expect(CarsCtrl.cars.length)
				.toEqual(10);
		});

		it('should have 24 cars in total.', function () {
			expect(CarsCtrl.totalCars)
				.toEqual(24);
		});

		it('should set showList to true', function () {
			expect(CarsCtrl.showList)
				.toBe(true);
		});

	});

	describe('CarsService errors.', function () {
		beforeEach(function () {
			doReject = true;
			returnData = false;
		});

		// Initialize the controller and a mock scope
		beforeEach(inject(setUp));

		afterEach(cleanUp);

		it('should get 0 cars.', function () {
			expect(CarsCtrl.cars.length)
				.toEqual(0);
		});

		it('should have a total of 0 cars.', function () {
			expect(CarsCtrl.totalCars)
				.toEqual(0);
		});

		it('should set showList to false', function () {
			expect(CarsCtrl.showList)
				.toBe(false);
		});

	});
});
