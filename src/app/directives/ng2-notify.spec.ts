/// <reference path="../../../typings/browser.d.ts" />

import {
describe,
expect,
beforeEach,
afterEach,
it,
inject,
TestComponentBuilder
} from 'angular2/testing';
import {ElementRef, provide} from 'angular2/core';
import {Ng2Notify} from './ng2-notify';
import {Ng2NotifyService} from '../services/ng2-notify';

describe('Ng2Notify', () => {
	let notifyDirective: Ng2Notify;
	let notifyService: Ng2NotifyService = new Ng2NotifyService();
	let originalTimeout;

	beforeEach(() => {
		notifyDirective = new Ng2Notify(notifyService);

		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
	});

	afterEach(() => {
		jasmine.clock().uninstall();
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

// TODO: Test subscribe
	it('should have a empty Array var "notifications"', () => {
		expect(notifyDirective.notifications).toEqual([]);
	});

	it('should have a null string "corner"', () => {
		expect(notifyDirective.corner).toBeNull(true);
	});

	it('notifyService should be a instance of Ng2NotifyService', () => {
		expect(notifyDirective.notifyService instanceof Ng2NotifyService).toBe(true);
	});

	it('if set a new notify, notifications.length should be 1', () => {
		notifyDirective.setNotify({
			'type': 'default',
			'message': 'Default notification.',
			'corner': 'right-top',
			'delay': 5000
		});
		expect(notifyDirective.notifications.length).toBe(1);
	});

	it('if set some notify\'s, notifications.length should be like notify\'s entered', () => {
		notifyDirective.setNotify({
			'type': 'default',
			'message': 'Default notification #1.',
			'corner': 'right-top',
			'delay': 5000
		});

		notifyDirective.setNotify({
			'type': 'default',
			'message': 'Default notification #2.',
			'corner': 'right-top',
			'delay': 5000
		});

		expect(notifyDirective.notifications.length).toBe(2);
	});

	it('when set a new notify, corner has new position', () => {
		notifyDirective.setNotify({
			'type': 'default',
			'message': 'Default notification #1.',
			'corner': 'right-top',
			'delay': 2000
		});

		expect(notifyDirective.corner).toBe('right-top');
	});

	it('delay seconds after set notify, should been has removed from array', (done) => {
		jasmine.clock().uninstall();
		jasmine.clock().install();

		notifyDirective.setNotify({
			'type': 'default',
			'message': 'Default notification #1.',
			'corner': 'right-top',
			'delay': 1000
		});

		expect(notifyDirective.notifications.length).toBe(1);
		expect(notifyDirective.notifications[0].notify).toBe(true);
		jasmine.clock().tick(1500);
		expect(notifyDirective.notifications.length).toBe(0);

		done();
	});
});
