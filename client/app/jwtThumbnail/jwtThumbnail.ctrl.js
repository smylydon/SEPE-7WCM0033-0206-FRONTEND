(function(app) {
  'use strict';

  app.module('jwt.Thumbnail', [])
    .controller('jwtThumbnailCtrl', jwtThumbnailCtrl);

  /*@ngInject*/
  function jwtThumbnailCtrl($scope, $element) {
    var vm = this; //jshint ignore:line
    vm.thumb = $scope.jwtImage ||'./images/default/ghostVehicleLarge.jpg';
  }

})(angular);
