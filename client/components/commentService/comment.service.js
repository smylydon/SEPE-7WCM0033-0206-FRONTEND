(function(app) {
    'use strict';
    app.module('services.comments',['restangular'])
      .service('CommentService', CommentService);

    /*@ngInject*/
    function CommentService($q, Restangular) {
        var isBusy = false;
        var commentPromise = false;

        var external = {
            saveComment: saveComment
        };

        function getComment(message) {
            if (isBusy) {
                return commentPromise.promise;
            }
            isBusy = true;
            commentPromise = $q.defer();
            Restangular.one('comment').customPOST(message).then(function(success) {
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
            Restangular.one('comment').customPOST(message).then(function(success) {
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
