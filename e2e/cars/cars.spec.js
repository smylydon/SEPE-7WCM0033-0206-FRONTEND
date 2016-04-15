'use strict';

describe('Cars View', function () {
	var carsPage, carsURL;
	beforeEach(function () {
		browser.driver.manage()
			.window()
			.maximize();
		browser.get('/cars/');
		carsPage = require('./cars.po');
	});

	it('should be possible to navigate to cars route without login.', function () {
		browser.get('/cars/')
			.then(function () {
				expect(browser.getCurrentUrl())
					.toMatch('/cars/');
			}, 10000);
	});

	it('should be possible to see ten rows to start.', function () {
		expect(browser.getCurrentUrl())
			.toMatch('/cars/');
		expect(carsPage.carRows.length)
			.toEqual(10);
	});

});
