(function(app) {

  'use strict';

  app.module('services.commentsModal', [])
    .service('CommentsModalService', CommentsModalService);

  /*@ngInject*/
  function CommentsModalService($rootScope, $uibModal,$q) {
    var isBusy = false;
    var commentPromise = false;

    var external = {
      showModal: showModal
    };

    function showModal(comment) {
      var modalScope = $rootScope.$new();
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'components/commentsModal/commentsModal.tpl.html',
        size: 'md',
        controllerAs: 'commentsModalCtrl',
        scope: modalScope,
        controller: function() {
          var vm = this;
          vm.comment = comment;

          vm.cancel = function() {
            modalInstance.dismiss('cancel');
          };
        }
      });
    }
    return external;
  }

})(angular);
