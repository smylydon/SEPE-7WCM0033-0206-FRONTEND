(function(app) {
  'use strict';
  app.module('services.comments', ['restangular'])
    .service('CommentsService', CommentsService);

  /*@ngInject*/
  function CommentsService($q, Restangular) {
    var isBusy = false;
    var commentPromise = false;

    var external = {
      getComments: getComments,
      saveComment: saveComment
    };

    function getComments() {
      if (isBusy) {
        return commentPromise.promise;
      }
      isBusy = true;
      commentPromise = $q.defer();
      Restangular.one('comments').get().then(function(success) {
        commentPromise.resolve(success);
        isBusy = false;
      }, function(error) {
        commentPromise.reject(error);
        isBusy = false;
      });
      return commentPromise.promise;
    }

    function saveComment(message) {
      if (isBusy) {
        return commentPromise.promise;
      }
      isBusy = true;
      commentPromise = $q.defer();
      Restangular.one('comments').customPOST(message).then(function(success) {
        commentPromise.resolve(success);
        isBusy = false;
      }, function(error) {
        commentPromise.reject(error);
        isBusy = false;
      });
      return commentPromise.promise;
    }

    return external;
  }
})(angular);
