'use strict';
//http://ng-learn.org/2014/08/Testing_Promises_with_Jasmine/

describe('PeopleService', function() {
  var PeopleService = null;
  var $httpBackend = null;
  var aPerson = {
    "name": "Fred",
    "message": "Test test.",
    "email": "fred@bedrock.com",
    "subject": "Wilmaaa!!!!"
  };

  // load the controller's module
  //beforeEach(module('jwtfrontendApp'));
  beforeEach(module('services.people'));

  beforeEach(inject(function($rootScope, _$httpBackend_, _PeopleService_) {
    $httpBackend = _$httpBackend_;
    PeopleService = _PeopleService_;
    $httpBackend.whenGET(/components.*/).respond(200, '');
    $httpBackend.whenGET(/app.*/).respond(200, '');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be possible to save a person', function(done) {
    var person = _.clone(aPerson);

    $httpBackend.when('POST', '/people', aPerson)
      .respond(200, {
        success: true,
        message: ''
      });
    PeopleService.savePerson(person)
      .then(function(success) {
        expect(success.success).toBe(true);
        expect(success.message).toBe('');
      }).catch(function(error) {
        expect(error).toBeUndefined();
      }).finally(done)
    $httpBackend.flush();
  });
/*
  it('should be not be possible to save a comment without an email address', function(done) {
    var comment = _.clone(aComment);

    $httpBackend.when('POST', '/comments', comment)
      .respond(404, {
        success: false,
        message: 'email required'
      });
    CommentsService.saveComment(comment)
      .then(function(success) {
        expect(success).toBeUndefined();
      }).catch(function(error) {
        expect(error.data.success).toBe(false);
        expect(error.data.message).toBe('email required');
      }).finally(done)
    $httpBackend.flush();
  });*/
});
