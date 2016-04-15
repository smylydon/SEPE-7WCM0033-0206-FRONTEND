/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var CarPage = function () {
	var self = this;
	this.carRows = null;
	element.all(by.css('.car-row'))
		.then(function (rows) {
			self.carRows = rows;
		});
};

module.exports = new CarPage();
