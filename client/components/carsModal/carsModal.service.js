(function(app) {

  'use strict';

  app.module('services.carsModal', ['jwt.uploader','services.upload'])
    .service('CarsModalService', CarsModalService);

  /*@ngInject*/
  function CarsModalService($rootScope, $uibModal,$q, UploadService) {
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

          vm.uploadFiles = function (files) {
            UploadService.upload('cars/uploadpix', files)
              .then(function (success) {
                console.log('upload done:', success.success);
              })
              .catch(function (error) {
                console.log('failed to upload:', error);
              });
          };

          vm.cancel = function() {
            modalInstance.dismiss('cancel');
          };
        }
      });
    }
    return external;
  }

})(angular);
