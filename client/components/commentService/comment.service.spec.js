'use strict';

describe('CommentService', function() {
  var CommentService = null;
  var $httpBackend = null;
  var aComment = {
    "name":"Fred",
    "message":"Test test.",
    "email":"fred@bedrock.com",
    "subject":"Wilmaaa!!!!"
  };

  // load the controller's module
  beforeEach(module('jwtfrontendApp'));
  //beforeEach(module('restangular'));
  beforeEach(module('services.comments'));

  beforeEach(inject(function($rootScope, _$httpBackend_, _CommentService_) {
    $httpBackend = _$httpBackend_;
    CommentService = _CommentService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be possible to save a comment', function() {
    var comment = _.clone(aComment);
    CommentService.saveComment(comment);

    $httpBackend.when('POST', 'http://localhost:8000/api/comment', aComment)
      .respond({
        success: true,
        message: ''
      });

    $httpBackend.flush();
  });

  it('should be not be possible to save a comment without an email address', function() {
    var comment = _.clone(aComment);
    comment.email = '';
    CommentService.saveComment(comment);

    $httpBackend.when('POST', 'http://localhost:8000/api/comment', aComment)
      .respond({
        success: true,
        message: ''
      });

    $httpBackend.flush();
  });
});
