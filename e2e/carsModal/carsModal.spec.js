'use strict';

describe('CarsModal', function() {
  var carsModal, carsURL;
  beforeEach(function() {
    browser.driver.manage()
    	.window()
    	.maximize();
    browser.get('/cars/');
    carsModal = require('./carsModal.po');
  });
/*
  xit('should be possible to open modal', function() {
    expect(carsModal.row1.isPresent()).toBe(true);
    console.log('editBtn:', carsModal.editBtn);
    carsModal.editBtn.click().then(function() {
      expect(element(by.css('.modal-content')).isPresent()).toBe(true);
    });
  });
*/
});
