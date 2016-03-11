/// <reference path="../../../typings/browser.d.ts" />
var testing_1 = require('angular2/testing');
var ng2_notify_1 = require('./ng2-notify');
var ng2_notify_2 = require('../services/ng2-notify');
testing_1.describe('Ng2Notify', function () {
    var notifyDirective;
    var notifyService = new ng2_notify_2.Ng2NotifyService();
    var originalTimeout;
    testing_1.beforeEach(function () {
        notifyDirective = new ng2_notify_1.Ng2Notify(notifyService);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    });
    testing_1.afterEach(function () {
        jasmine.clock().uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    testing_1.it('should have a empty Array var "notifications"', function () {
        testing_1.expect(notifyDirective.notifications).toEqual([]);
    });
    testing_1.it('should have a null string "corner"', function () {
        testing_1.expect(notifyDirective.corner).toBeNull(true);
    });
    testing_1.it('notifyService should be a instance of Ng2NotifyService', function () {
        testing_1.expect(notifyDirective.notifyService instanceof ng2_notify_2.Ng2NotifyService).toBe(true);
    });
    testing_1.it('if set a new notify, notifications.length should be 1', function () {
        notifyDirective.setNotify({
            'type': 'default',
            'message': 'Default notification.',
            'corner': 'right-top',
            'delay': 5000
        });
        testing_1.expect(notifyDirective.notifications.length).toBe(1);
    });
    testing_1.it('if set some notify\'s, notifications.length should be like notify\'s entered', function () {
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
        testing_1.expect(notifyDirective.notifications.length).toBe(2);
    });
    testing_1.it('when set a new notify, corner has new position', function () {
        notifyDirective.setNotify({
            'type': 'default',
            'message': 'Default notification #1.',
            'corner': 'right-top',
            'delay': 2000
        });
        testing_1.expect(notifyDirective.corner).toBe('right-top');
    });
    testing_1.it('delay seconds after set notify, should been has removed from array', function (done) {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        notifyDirective.setNotify({
            'type': 'default',
            'message': 'Default notification #1.',
            'corner': 'right-top',
            'delay': 1000
        });
        testing_1.expect(notifyDirective.notifications.length).toBe(1);
        testing_1.expect(notifyDirective.notifications[0].notify).toBe(true);
        jasmine.clock().tick(1500);
        testing_1.expect(notifyDirective.notifications.length).toBe(0);
        done();
    });
});
//# sourceMappingURL=ng2-notify.spec.js.map