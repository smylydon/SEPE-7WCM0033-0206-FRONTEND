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
      //$event.stopProgration();
      console.log('submit buttton clicked');
      var message = {};

      message.email = vm.emailAddress;
      message.password = vm.password;

      LoginService.login(message)
        .then(function(success) {
          $state.go('home');
        }).catch(function(error) {
          console.log('failed to login');
        });
    };
  }

})(angular);
