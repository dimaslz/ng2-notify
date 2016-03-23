/// <reference path="../../../typings/browser.d.ts" />

import {
describe,
expect,
beforeEach,
it,
inject,
injectAsync,
beforeEachProviders,
TestComponentBuilder
} from 'angular2/testing';
import {ElementRef} from 'angular2/core';
import {Ng2NotifyService} from '../services/ng2-notify';
import {Observable} from 'rxjs/Observable';

describe('Ng2NotifyService', () => {
	let notifyService: Ng2NotifyService = new Ng2NotifyService();

	beforeEach(() => {
		spyOn(console, 'error');
	});

	it('"notify" var is Observable<object> type', () => {
		expect(notifyService.notify instanceof Observable).toBe(true);
	});

	it('default corner string should be "right-bottom"', () => {
		expect(notifyService.corner).toBe('right-bottom');
	});

	it('default delay should be 2000ms', () => {
		expect(notifyService.delay).toBe(2000);
	});

	it('default delay should be "[\'right-bottom\', \'left-bottom\', \'left-top\', \'right-top\']"', () => {
		expect(notifyService.positionTypes[0]).toBe('right-bottom');
		expect(notifyService.positionTypes[1]).toBe('left-bottom');
		expect(notifyService.positionTypes[2]).toBe('left-top');
		expect(notifyService.positionTypes[3]).toBe('right-top');
	});

	it('show new notification without message. Should report a console.error()', function() {
		let show = notifyService.show('default', {});

		expect(show).toBeFalsy;
		expect(console.error).toHaveBeenCalledWith('ng2NotifyError: You must to set a message!!');
	});

	it('show new notification with delay like string.  Should report a console.error()', function() {
		let show = notifyService.show('default', {
			message: 'text',
			delay: 'seconds'
		});

		expect(show).toBeFalsy;
		expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', `The delay "seconds" must be a number`);
	});

	it('set notification config. Add default vars', function() {
		notifyService.config({
			corner: 'right-bottom',
			delay: 2000
		});

		expect(notifyService.corner).toBe('right-bottom');
		expect(notifyService.delay).toBe(2000);
	});

	it('if set config with not exist corner, return a console.error()', function() {
		notifyService.config({
			corner: 'wrong-corner',
			delay: 2000
		});

		expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The corner "wrong-corner" do not exist');
	});

	it('if set config with not string delay, return a console.error()', function() {
		notifyService.config({
			corner: 'right-bottom',
			delay: '2seconds'
		});

		expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The delay "2seconds" must be a number');
	});

	it('if set config with corner and delay, should return 2 console.error()', function() {
		notifyService.config({
			corner: 'wrong-corner',
			delay: '2seconds'
		});

		expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The delay "2seconds" must be a number');
		expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The corner "wrong-corner" do not exist');
	});
});
