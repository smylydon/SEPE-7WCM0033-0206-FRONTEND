'use strict';

describe('Login View', function () {
	var page, loginURL;

	beforeEach(function () {
		browser.driver.manage()
			.window()
			.maximize();
		browser.get('/login');
		page = require('./login.po');
	});

	afterEach(function () {
		browser.get('/logged-out');
	})

	it('should prevent navigation to route that require login.', function () {
		browser.get('/comments/')
			.then(function () {
				expect(browser.getCurrentUrl())
					.toMatch('/');
			}, 10000);
	});

	it('should include emailAddress and password inputs.', function () {
		page.emailAddressEl.sendKeys('fred@mailinator.com');
		page.passwordEl.sendKeys('x');
		expect(page.emailAddressEl.getAttribute('value'))
			.toBe('fred@mailinator.com');
	});

	it('should login and redirect to home.', function () {
		page.emailAddressEl.sendKeys('fred@mailinator.com');
		page.passwordEl.sendKeys('x');
		page.submitEl.click()
			.then(function () {
				browser.waitForAngular();
				expect(browser.getCurrentUrl())
					.toMatch('/');
			}, 10000);
	});
});
