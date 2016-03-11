/// <reference path="../../../typings/browser.d.ts" />
var testing_1 = require('angular2/testing');
var ng2_notify_1 = require('../services/ng2-notify');
var Observable_1 = require('rxjs/Observable');
testing_1.describe('Ng2NotifyService', function () {
    var notifyService = new ng2_notify_1.Ng2NotifyService();
    testing_1.beforeEach(function () {
        spyOn(console, 'error');
    });
    testing_1.it('"notify" var is Observable<object> type', function () {
        testing_1.expect(notifyService.notify instanceof Observable_1.Observable).toBe(true);
    });
    testing_1.it('default corner string should be "right-bottom"', function () {
        testing_1.expect(notifyService.corner).toBe('right-bottom');
    });
    testing_1.it('default delay should be 2000ms', function () {
        testing_1.expect(notifyService.delay).toBe(2000);
    });
    testing_1.it('default delay should be "[\'right-bottom\', \'left-bottom\', \'left-top\', \'right-top\']"', function () {
        testing_1.expect(notifyService.positionTypes[0]).toBe('right-bottom');
        testing_1.expect(notifyService.positionTypes[1]).toBe('left-bottom');
        testing_1.expect(notifyService.positionTypes[2]).toBe('left-top');
        testing_1.expect(notifyService.positionTypes[3]).toBe('right-top');
    });
    testing_1.it('show new notification without message. Should report a console.error()', function () {
        var show = notifyService.show('default', {});
        testing_1.expect(show).toBeFalsy;
        testing_1.expect(console.error).toHaveBeenCalledWith('ng2NotifyError: You must to set a message!!');
    });
    testing_1.it('show new notification with delay like string.  Should report a console.error()', function () {
        var show = notifyService.show('default', {
            message: 'text',
            delay: 'seconds'
        });
        testing_1.expect(show).toBeFalsy;
        testing_1.expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The delay "seconds" must be a number');
    });
    testing_1.it('set notification config. Add default vars', function () {
        notifyService.config({
            corner: 'right-bottom',
            delay: 2000
        });
        testing_1.expect(notifyService.corner).toBe('right-bottom');
        testing_1.expect(notifyService.delay).toBe(2000);
    });
    testing_1.it('if set config with not exist corner, return a console.error()', function () {
        notifyService.config({
            corner: 'wrong-corner',
            delay: 2000
        });
        testing_1.expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The corner "wrong-corner" do not exist');
    });
    testing_1.it('if set config with not string delay, return a console.error()', function () {
        notifyService.config({
            corner: 'right-bottom',
            delay: '2seconds'
        });
        testing_1.expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The delay "2seconds" must be a number');
    });
    testing_1.it('if set config with corner and delay, should return 2 console.error()', function () {
        notifyService.config({
            corner: 'wrong-corner',
            delay: '2seconds'
        });
        testing_1.expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The delay "2seconds" must be a number');
        testing_1.expect(console.error).toHaveBeenCalledWith('ng2NotifyError: ', 'The corner "wrong-corner" do not exist');
    });
});
//# sourceMappingURL=ng2-notify.spec.js.map