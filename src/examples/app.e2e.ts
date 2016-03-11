'use strict';

describe('WebApp', function() {
	let originalTimeout;

	beforeEach(() => {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	});

	afterEach(() => {
		jasmine.clock().uninstall();
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

  describe('index page', function(){

    browser.get('/');

    it('should have a title with "ng2-notify" text', function() {
      var menuItems = element(by.css('h1'));
      expect(menuItems.getText()).toBe('ng2-notify');
    });

		it('should have 4 images positions', function() {
      var menuItems = element.all(by.css('.positions li'));
      expect(menuItems.count()).toBe(4);
    });

		it('should have 4 buttons examples', function() {
      var menuItems = element.all(by.css('#actions button'));
      expect(menuItems.count()).toBe(4);
    });
  });
});