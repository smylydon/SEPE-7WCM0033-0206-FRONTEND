(function(app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('UploadCarPixCtrl', UploadCarPixCtrl);

  /*@ngInject*/
  function UploadCarPixCtrl($scope, $state, UploadService) {
    var vm = this;

    vm.submit = function($event) {
      $event.preventDefault();
      var vehiclePix = $('#vehiclePix')[0];
      console.log('submit buttton clicked:', vehiclePix, vehiclePix.files);

      UploadService.upload('cars/uploadpix',vehiclePix.files)
        .then(function(success) {
          console.log('upload done:',success.success);
        }).catch(function(error) {
          console.log('failed to upload:', error);
        });
    };
  }

})(angular);
