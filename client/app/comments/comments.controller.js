(function(app) {
  'use strict';

  app.module('jwtfrontendApp')
    .controller('CommentsCtrl', CommentsCtrl);

  function CommentsCtrl($scope, $state, CommentsService) {
    var vm = this;

    vm.comments = [];
    vm.showList = false;

    function getComments(){
        CommentsService.getComments().then(function (comments) {
            vm.comments = comments;
            vm.showList = false;
            if (vm.comments.length > 0) {
              vm.showList = true;
            }
            console.log('comments:', comments);
        }, function (error) {
          vm.showList = false;
            console.log(error);
        });
    }

    getComments();
  }

})(angular);
