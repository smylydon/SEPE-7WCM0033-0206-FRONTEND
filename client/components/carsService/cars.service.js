(function(app) {
  'use strict';
  app.module('services.cars', ['LocalStorageModule', 'restangular'])
    .service('CarsService', CarsService);

  /*@ngInject*/
  function CarsService($q, localStorageService, Restangular) {
    var isBusy = false;
    var carsPromise = false;

    var external = {
      getCars: getCars,
      getACar: getACar,
      getMakes: getMakes,
      getModels: getModels,
      getYears: getYears,
      updateCar: updateCar
    };

    function resolve(result) {
      carsPromise.resolve(result);
      isBusy = false;
    }

    function reject(error) {
      carsPromise.reject('search failed');
      isBusy = false;
    }

    function makeCall(callback) {
      if (isBusy) {
        return carsPromise.promise;
      }
      isBusy = true;
      carsPromise = $q.defer();
      callback();
      return carsPromise.promise;
    }

    function getCars(setter) {
      setter = setter || {};
      var callback = function() {
        Restangular.one('cars')
          .get(setter)
          .then(resolve, reject);
      };
      return makeCall(callback);
    }

    function getACar(carId) {
      var callback = function() {
        Restangular.one('cars', carId)
          .get()
          .then(resolve, reject);
      };
      return makeCall(callback);
    }

    function getModels(makesId) {
      var callback = function() {
        Restangular.one('cars/models', makesId)
          .get()
          .then(resolve, reject);
      };
      return makeCall(callback);
    }

    function getYears(makesId) {
      var callback = function() {
        Restangular.one('cars/years', makesId)
          .get()
          .then(resolve, reject);
      };
      return makeCall(callback);
    }

    function getMakes() {
      var callback = function() {
        Restangular.one('makes')
          .get()
          .then(resolve, reject);
      };
      return makeCall(callback);
    }

    function updateCar(car) {
      if (car && car.id) {
        var callback = function() {
          Restangular.one('cars', car.id).customPUT(car)
            .then(resolve, reject);
        };

        return makeCall(callback);
      } else {
        $q.reject('no data sent');
      }
    }
    return external;
  }
})(angular);
