(function(app) {
  'use strict';
  
  app.module('services.people', ['restangular'])
    .service('PeopleService', PeopleService);

  /*@ngInject*/
  function PeopleService($q, Restangular) {
    var isBusy = false;
    var peoplePromise = false;

    var external = {
      getPeople: getPeople,
      savePerson: savePerson
    };

    function getPeople() {
      if (isBusy) {
        return peoplePromise.promise;
      }
      isBusy = true;
      peoplePromise = $q.defer();
      Restangular.one('people').get().then(function(success) {
        peoplePromise.resolve(success);
        isBusy = false;
      }, function(error) {
        peoplePromise.reject(error);
        isBusy = false;
      });
      return peoplePromise.promise;
    }

    function savePerson(person) {
      if (isBusy) {
        return peoplePromise.promise;
      }
      isBusy = true;
      peoplePromise = $q.defer();
      Restangular.one('people').customPOST(person).then(function(success) {
        peoplePromise.resolve(success);
        isBusy = false;
      }, function(error) {
        peoplePromise.reject(error);
        isBusy = false;
      });
      return peoplePromise.promise;
    }

    return external;
  }
})(angular);
