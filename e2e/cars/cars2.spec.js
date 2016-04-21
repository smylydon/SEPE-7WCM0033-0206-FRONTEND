'use strict';

describe('Cars View:Logged In', function () {
	var carsPage, carsURL;

	function login() {
		return browser.get('/login')
			.then(function () {
				var page = require('../login/login.po');
				page.emailAddressEl.sendKeys('fred@mailinator.com');
				page.passwordEl.sendKeys('x');
				return page.submitEl.click();
			});
	}

	beforeEach(function () {
		browser.driver.manage()
			.window()
			.maximize();
	});

	afterEach(function () {
		browser.get('/logged-out');
	});

	it('should be possible to navigate to cars route while logged in.', function () {
		login()
			.then(function () {
				return browser.get('/cars/');
			})
			.then(function () {
				expect(browser.getCurrentUrl())
					.toMatch('/cars/');
			});
	});

	it('should be possible to see ten rows to start while logged in.', function () {
		login()
			.then(function () {
				return browser.get('/cars/');
			})
			.then(function () {
				carsPage = require('./cars.po');
				expect(carsPage.carRows.length)
					.toEqual(10);
			});
	});

});
