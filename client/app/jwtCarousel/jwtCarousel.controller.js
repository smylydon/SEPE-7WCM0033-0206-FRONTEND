(function(app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('jwtCarouselCtrl', jwtCarouselCtrl);

  /*@ngInject*/
  function jwtCarouselCtrl($scope) {
    var vm = this; //jshint ignore:line
    var photos = ['./images/default/ghostVehicleLarge.jpg'];
    var temp = $scope.jwtPhotos;
    vm.icons = _.isArray(temp) && temp.length > 0 ? temp : _.clone(photos);
    vm.currentImage = vm.icons[0];
    vm.containerWidth = 100;

    if (vm.icons.length > 0) {
      vm.containerWidth = vm.icons.length * 104;
    }
    if (vm.containerWidth < 457) {
      vm.containerWidth = 457;
    }

    vm.selectImage = function($event, index) {
      vm.currentImage = vm.icons[index];
    };
  }

})(angular);
