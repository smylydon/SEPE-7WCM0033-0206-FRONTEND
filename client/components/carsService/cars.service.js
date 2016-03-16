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
      getACar: getACar
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
        Restangular.one('cars').get(setter).then(resolve, reject);
      };
      return makeCall(callback);
    }

    function getACar(carId) {
      var callback = function() {
        Restangular.one('cars',carId).get().then(resolve, reject);
      };
      return makeCall(callback);
    }
    return external;
  }
})(angular);
