(function(app) {
  'use strict';

  app.module('jwt.uploadButton', [])
    .controller('jwtUploadButtonCtrl', jwtUploadButtonCtrl);

  /*@ngInject*/
  function jwtUploadButtonCtrl($scope, $element) {
    var vm = this; //jshint ignore:line
    var uploadInput = null;
    var title = null;
    var span = null;
    var uploadCallback = $scope.jwtCallback || angular.noop;
    var uploadLabel = $scope.jwtLabel || 'Upload';

    function addUploadElement() {
      if (uploadInput || title) {
        uploadInput.off('change');
        title.remove();
        uploadInput.remove();
      }
      uploadInput = angular.element('<input type="file" accept="image/*" size="1">');
      title = angular.element('<b>' + uploadLabel + '</b>');
      span = $element.find('.uploadButton');
      uploadInput.on('change', uploadImages);
      span.append(uploadInput);
      span.append(title);
    }

    function uploadImages($event) {
      uploadCallback(uploadInput[0].files);
      addUploadElement();
    }

    addUploadElement();
  }

})(angular);
