(function(app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('LoginCtrl', LoginCtrl);

  /*@ngInject*/
  function LoginCtrl($scope, $state, LoginService) {
    var vm = this;
    vm.emailAddress = '';
    vm.password = '';

    vm.submit = function($event) {
      var message = {};

      message.email = vm.emailAddress;
      message.password = vm.password;
      console.log('submit buttton clicked:', message);
      LoginService.login(message)
        .then(function(success) {
          $state.go('home');
        }).catch(function(error) {
          console.log('failed to login');
        });
    };
  }

})(angular);
