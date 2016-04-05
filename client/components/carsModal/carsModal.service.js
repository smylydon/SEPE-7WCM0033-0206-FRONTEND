(function(app) {

  'use strict';

  app.module('services.carsModal', [])
    .service('CarsModalService', CarsModalService);

  /*@ngInject*/
  function CarsModalService($rootScope, $uibModal,$q) {
    var isBusy = false;
    var carsPromise = false;

    var external = {
      showModal: showModal
    };

    function showModal(car) {
      var modalScope = $rootScope.$new();
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'components/carsModal/carsModal.tpl.html',
        size: 'md',
        controllerAs: 'carsModalCtrl',
        scope: modalScope,
        controller: function() {
          var vm = this;
          vm.car = _.clone(car);

          vm.cancel = function() {
            modalInstance.dismiss('cancel');
          };
        }
      });
    }
    return external;
  }

})(angular);
