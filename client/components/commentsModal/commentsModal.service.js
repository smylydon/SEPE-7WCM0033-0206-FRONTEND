(function(app) {
  'use strict';
  app.module('services.commentsModal', [])
    .service('CommentsModalService', CommentsModalService);

  /*@ngInject*/
  function CommentsModalService($rootScope, $modal,$q) {
    var isBusy = false;
    var commentPromise = false;

    var external = {
      showModal: showModal
    };

    function showModal(comment) {
      var modalScope = $rootScope.$new();
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'components/commentsModal/commentsModal.tpl.html',
        size: 'sd',
        controllerAs: 'commentsModalCtrl',
        scope: modalScope,
        controller: function() {
          var vm = this;
          vm.comment = comment;

          vm.cancel = function() {
            modalInstance.dismiss('cancel');
          }
        }
      });
    }
    return external;
  }
})(angular);
